import VoltageClass from '#models/voltage_class'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class VoltageClassService {
  static async getVoltageClasses(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { sort, order, page, limit } = req.qs() as IQueryParams
    const voltageClasses = await VoltageClass.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return voltageClasses.serialize()
  }
}
