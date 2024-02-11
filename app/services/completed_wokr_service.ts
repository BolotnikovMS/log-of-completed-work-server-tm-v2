import CompletedWork from '#models/completed_work'
import { Request } from '@adonisjs/core/http'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class CompletedWorkService {
  static async getCompletedWorks(req: Request): Promise<CompletedWork[]> {
    const { sort = 'createdAt', order = 'desc', page, limit, substation } = req.qs() as IQueryParams
    const works = await CompletedWork.query()
      .if(substation, (query) => query.where('substationId', '=', substation))
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .preload('substation')
      .paginate(page, limit)

    return works
  }
}
