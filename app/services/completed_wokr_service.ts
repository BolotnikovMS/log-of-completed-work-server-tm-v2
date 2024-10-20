import { transformDataCompletedWork } from '#helpers/transform_completed_work_data'
import CompletedWork from '#models/completed_work'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import ExcelJS from 'exceljs'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

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

    const worksSerialize = works.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt'],
      },
      relations: {
        substation: {
          fields: {
            pick: ['fullNameSubstation'],
          },
          relations: {
            voltage_class: {
              fields: {
                pick: ['name'],
              },
            },
          },
        },
        work_producer: {
          fields: {
            pick: ['shortName'],
          },
        },
        author: {
          fields: {
            pick: ['shortName'],
          },
        },
        type_work: {
          fields: {
            pick: ['name']
          }
        }
      },
    })

    return worksSerialize
  }
  static async createExcelFile(req: Request): Promise<ExcelJS.Buffer> {
    const works = await this.getCompletedWorks(req)
    const transformData = transformDataCompletedWork(works.data)
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
    transformData.forEach((work, i) => {
      const row = worksheet.getRow(i + 2)

      Object.keys(work).forEach((key, iCel) => {
        row.getCell(iCel + 1).value = work[key]
      })
    })
    const descrCol = worksheet.getColumn('description')
    const noteCol = worksheet.getColumn('note')

    descrCol.eachCell(cell => cell.alignment = { wrapText: true })
    noteCol.eachCell(cell => cell.alignment = { wrapText: true })

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }
}
