import { OrderByEnums } from '#enums/sort'
import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import TypeKp from '#models/type_kp'
import { typeKpValidator } from '#validators/type_kp'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

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

  static async createTypeKp(req: Request, auth: Authenticator<Authenticators>): Promise<TypeKp> {
    const { user } = auth
    const validatedData = await req.validateUsing(typeKpValidator)
    const typeKp = await TypeKp.create({ userId: user?.id, ...validatedData })

    return typeKp
  }

  static async updateTypeKp(req: Request, params: IParams): Promise<TypeKp> {
    const typeKp = await TypeKp.findOrFail(params.id)
    const validatedData = await req.validateUsing(typeKpValidator)
    const updTypeKp = await typeKp.merge(validatedData).save()

    return updTypeKp
  }

  static async deleteTypeKp(params: IParams): Promise<void> {
    const typeKp = await TypeKp.findOrFail(params.id)

    await typeKp.delete()

    return
  }
}
