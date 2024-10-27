import HeadController from '#models/head_controller'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export class HeadControllersService {
  static async getHeadControllers(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { sort, order, limit = -1, page } = req.qs() as IQueryParams
    const headControllers = await HeadController.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return headControllers.serialize()
  }
}
