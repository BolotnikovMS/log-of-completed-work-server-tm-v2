import { OrderByEnums } from '#enums/sort'
import { IQueryParams } from '#interfaces/query_params'
import Modem from '#models/modem'
import { Request } from '@adonisjs/core/http'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class ModemService {
  static async getModems(req: Request): Promise<ModelPaginatorContract<Modem>> {
    const { sort, order, page, limit } = req.qs() as IQueryParams
    const modems = await Modem.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return modems
  }
}
