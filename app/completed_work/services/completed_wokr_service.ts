import CompletedWork from '#completed_work/models/completed_work'
import { completedWorkValidator } from '#completed_work/validators/completed_work'
import { OrderByEnums } from '#enums/sort'
import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

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
      typeWork,
      inControl
    } = req.qs() as IQueryParams
    const works = await CompletedWork.query()
      .if(dateStart && dateEnd, (query) =>
        query.whereBetween('dateCompletion', [dateStart, dateEnd])
      )
      .if(executor, query => query.where('workProducerId', '=', executor))
      .if(substation, (query) => query.where('substationId', '=', substation))
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(typeWork, query => query.whereIn('typeWorkId', [...typeWork]))
      .if(inControl, query => query.where('inControl', Boolean(inControl)))
      .preload('substation', (query) => {
        query.preload('voltage_class')
        query.preload('object_type')
      })
      .preload('work_producer')
      .preload('author')
      .preload('type_work')
      .paginate(page, limit)

    return works.serialize()
  }

  static async getCompletedWorkById(params: IParams): Promise<CompletedWork> {
    const work = await CompletedWork.findOrFail(params.id)

    return work
  }

  static async getCompletedWorkInfo(params: IParams): Promise<CompletedWork> {
    const completedWork = await CompletedWork.findOrFail(params.id)

    await completedWork.load('substation', (query) => {
      query.preload('voltage_class')
      query.preload('object_type')
    })
    await completedWork.load('type_work')
    await completedWork.load('work_producer')
    await completedWork.load('author')

    return completedWork
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
