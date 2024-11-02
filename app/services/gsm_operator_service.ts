import { OrderByEnums } from '#enums/sort'
import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import GsmOperator from '#models/gsm_operator'
import { gsmOperatorValidator } from '#validators/gsm_operator'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'

export default class GsmOperatorService {
  static async getGsmOperators(req: Request): Promise<GsmOperator[]> {
    const { sort, order } = req.qs() as IQueryParams
    const gsmOperators = await GsmOperator.query().if(sort && order, (query) =>
      query.orderBy(sort, OrderByEnums[order])
    )

    return gsmOperators
  }

  static async createGsmOperator(req: Request, auth: Authenticator<Authenticators>): Promise<GsmOperator> {
    const { user } = auth
    const validatedData = await req.validateUsing(gsmOperatorValidator)
    const gsmOperator = await GsmOperator.create({ userId: user?.id, ...validatedData })

    return gsmOperator
  }

  static async updateGsmOperator(req: Request, params: IParams): Promise<GsmOperator> {
    const gsmOperator = await GsmOperator.findOrFail(params.id)
    const validatedData = await req.validateUsing(gsmOperatorValidator)
    const updGsmOperator = await gsmOperator.merge(validatedData).save()

    return updGsmOperator
  }

  static async deleteGsmOperator(params: IParams): Promise<void> {
    const gsmOperator = await GsmOperator.findOrFail(params.id)

    await gsmOperator.delete()
    
    return
  }
}
