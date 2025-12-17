import CompletedWork from '#completed_work/models/completed_work'
import type { CreateCompletedWork, QueryParamsCompletedWork, UpdateCompletedWork } from '#completed_work/types/index'
import { OrderByEnums } from '#shared/enums/index'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class CompletedWorkService {
  static async getCompletedWorks(filters: QueryParamsCompletedWork): Promise<ModelPaginatorContract<CompletedWork>> {
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
    } = filters
    const works = await CompletedWork.query()
      .if(dateStart && dateEnd, query =>
        query.whereBetween('dateCompletion', [dateStart!, dateEnd!])
      )
      .if(executor, query => query.where('workProducerId', '=', executor!))
      .if(substation, query => query.where('substationId', '=', substation!))
      .if(sort && order, query => query.orderBy(sort, OrderByEnums[order]))
      .if(typeWork, query => {
        if (Number.isInteger(+typeWork)) {
          query.where('typeWorkId', '=', typeWork)
        } else if (Array.isArray(typeWork)) {
          query.whereIn('typeWorkId', typeWork)
        }
      })
      .if(inControl, query => query.where('inControl', Boolean(inControl)))
      .preload('substation', query => {
        query.preload('voltage_class')
        query.preload('object_type')
      })
      .preload('work_producer')
      .preload('author')
      .preload('type_work')
      .paginate(page!, limit)

    return works
  }

  static async findById(id: number): Promise<CompletedWork> {
    const work = await CompletedWork.findOrFail(id)

    return work
  }

  static async findInfoById(id: number): Promise<CompletedWork> {
    const completedWork = await CompletedWork.findOrFail(id)

    await completedWork.load('substation', (query) => {
      query.preload('voltage_class')
      query.preload('object_type')
    })
    await completedWork.load('type_work')
    await completedWork.load('work_producer')
    await completedWork.load('author')

    return completedWork
  }

  static async create(data: CreateCompletedWork): Promise<CompletedWork> {
    const completedWork = await CompletedWork.create(data)

    return completedWork
  }

  static async update(id: number, data: UpdateCompletedWork): Promise<CompletedWork> {
    const completedWork = await CompletedWork.findOrFail(id)
    const updCompletedWork = await completedWork.merge(data).save()

    return updCompletedWork
  }

  static async delete(id: number): Promise<void> {
    const completedWork = await CompletedWork.findOrFail(id)

    await completedWork.delete()

    return
  }
}
