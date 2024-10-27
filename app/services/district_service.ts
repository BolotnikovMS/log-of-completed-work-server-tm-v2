import District from '#models/district'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class DistrictService {
  static async getDistricts(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { sort, order, page, limit = -1, search } = req.qs() as IQueryParams
    const districts = await District.query()
      .if(search, (query) => query.whereLike('name', `%${search}%`))
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)
    // const total: number = (await District.query().count('* as total'))[0].$extras.total
    // const total: number = districts.length

    return districts.serialize()
  }
}
