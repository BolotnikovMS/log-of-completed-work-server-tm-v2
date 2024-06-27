import CompletedWork from '#models/completed_work'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class CompletedWorkService {
  static async getCompletedWorks(req: Request): Promise<{
    meta: any
    data: ModelObject[]
  }> {
    const { sort = 'createdAt', order = 'desc', page, limit, substation } = req.qs() as IQueryParams
    const works = await CompletedWork.query()
      .if(substation, (query) => query.where('substationId', '=', substation))
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .preload('substation', (query) => query.preload('voltage_class'))
      .preload('work_producer')
      .preload('author')
      .paginate(page, limit)

    const worksSerialize = works.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt', 'substationId', 'workProducerId'],
      },
      relations: {
        substation: {
          fields: {
            pick: ['id', 'fullNameSubstation'],
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
            pick: ['id', 'shortName'],
          },
        },
        author: {
          fields: {
            pick: ['id', 'shortName'],
          },
        },
      },
    })

    return worksSerialize
  }
}
