import GsmOperator from '#models/gsm_operator'
import { Request } from '@adonisjs/core/http'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class GsmOperatorService {
  static async getGsmOperators(req: Request): Promise<GsmOperator[]> {
    const { sort, order } = req.qs() as IQueryParams
    const gsmOperators = await GsmOperator.query().if(sort && order, (query) =>
      query.orderBy(sort, OrderByEnums[order])
    )

    return gsmOperators
  }
}
