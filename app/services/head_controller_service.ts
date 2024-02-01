import HeadController from '#models/head_controller'
import { Request } from '@adonisjs/core/http'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export class HeadControllersService {
  static async getHeadControllers(req: Request): Promise<HeadController[]> {
    const { sort, order, limit, page } = req.qs() as IQueryParams
    const headControllers = await HeadController.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return headControllers
  }
}
