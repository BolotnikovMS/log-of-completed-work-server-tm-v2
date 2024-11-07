import CompletedWorkDto from '#dtos/completed_work'
import { OrderByEnums } from '#enums/sort'
import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import CompletedWork from '#models/completed_work'
import { completedWorkValidator } from '#validators/completed_work'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import ExcelJS, { Cell } from 'exceljs'

export default class CompletedWorkService {
  static async getCompletedWorks(req: Request): Promise<{
    meta: any
    data: ModelObject[]
  }> {
    const {
      sort = 'dateCompletion',
      order = 'desc',
      page,
      limit,
      substation,
      dateStart,
      dateEnd,
      executor,
      typeWork
    } = req.qs() as IQueryParams
    const works = await CompletedWork.query()
      .if(dateStart && dateEnd, (query) =>
        query.whereBetween('dateCompletion', [dateStart, dateEnd])
      )
      .if(executor, query => query.where('workProducerId', '=', executor))
      .if(substation, (query) => query.where('substationId', '=', substation))
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(typeWork, query => query.whereIn('typeWorkId', [...typeWork]))
      .preload('substation', (query) => query.preload('voltage_class'))
      .preload('work_producer')
      .preload('author')
      .preload('type_work')
      .paginate(page, limit)

    return works.serialize()
  }
  static async createExcelFile(req: Request): Promise<ExcelJS.Buffer> {
    const works = await this.getCompletedWorks(req)
    const transformData = works.data.map(work => new CompletedWorkDto(work as CompletedWork))
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.columns = [
      { header: 'Автор записи', key: 'author', width: 18 },
      { header: 'Выполнил', key: 'workProducer', width: 18 },
      { header: 'Категория работ', key: 'typeWork', width: 26 },
      { header: 'Дата выполнения', key: 'dateCompletion', width: 16 },
      { header: 'ПС', key: 'substation', width: 26 },
      { header: 'Описание', key: 'description', width: 50 },
      { header: 'Примечания', key: 'note', width: 50 },
    ]
    worksheet.getRow(1).eachCell((cell: Cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.font = { bold: true }
    })

    transformData.forEach(work => {
      worksheet.addRow({
        author: work.author,
        workProducer: work.work_producer,
        typeWork: work.type_work,
        dateCompletion: work.dateCompletion.split('-').reverse().join('.'),
        substation: work.substation,
        description: work.description,
        note: work.note,
      })
    })
    const descrCol = worksheet.getColumn('description')
    const noteCol = worksheet.getColumn('note')

    descrCol.eachCell(cell => cell.alignment = { wrapText: true })
    noteCol.eachCell(cell => cell.alignment = { wrapText: true })

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }

  static async createWork(req: Request, auth: Authenticator<Authenticators>): Promise<CompletedWork> {
    const { user } = auth
    const validatedData = await req.validateUsing(completedWorkValidator)
    const completedWork = await CompletedWork.create({
      userId: user?.id,
      ...validatedData,
    })

    return completedWork
  }

  static async deleteWork(params: IParams): Promise<void> {
    const completedWork = await CompletedWork.findOrFail(params.id)

    await completedWork.delete()
  }
}
