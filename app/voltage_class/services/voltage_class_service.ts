import { OrderByEnums } from '#shared/enums/sort'
import { IParams, IQueryParams } from '#shared/interfaces/index'
import VoltageClass from '#voltage_class/models/voltage_class'
import { voltageClassValidator } from '#voltage_class/validators/voltage_class'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class VoltageClassService {
  static async getVoltageClasses(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { sort, order, page, limit = -1 } = req.qs() as IQueryParams
    const voltageClasses = await VoltageClass.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return voltageClasses.serialize()
  }

  static async createDistrict(req: Request, auth: Authenticator<Authenticators>): Promise<VoltageClass> {
    const { user } = auth
    const validatedData = await req.validateUsing(voltageClassValidator)
    const voltageClass = await VoltageClass.create({ userId: user?.id, ...validatedData })

    return voltageClass
  }

  static async updateDistrict(req: Request, params: IParams): Promise<VoltageClass> {
    const voltageClass = await VoltageClass.findOrFail(params.id)
    const validatedData = await req.validateUsing(voltageClassValidator)
    const updVoltageClass = await voltageClass.merge(validatedData).save()

    return updVoltageClass
  }

  static async deleteDistrict(params: IParams): Promise<void> {
    const voltageClass = await VoltageClass.findOrFail(params.id)

    await voltageClass.delete()
  }
}
