import TypeKp from '#models/type_kp'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class TypeKpService {
  static async getTypesKps(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { sort, order, page, limit = -1 } = req.qs() as IQueryParams
    const typesKps = await TypeKp.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return typesKps.serialize()
  }
}
