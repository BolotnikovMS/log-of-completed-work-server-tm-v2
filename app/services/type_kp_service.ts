import TypeKp from '#models/type_kp'
import { Request } from '@adonisjs/core/http'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class TypeKpService {
  static async getTypesKps(req: Request): Promise<TypeKp[]> {
    const { sort, order, page, limit } = req.qs() as IQueryParams
    const typesKps = await TypeKp.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return typesKps
  }
}
