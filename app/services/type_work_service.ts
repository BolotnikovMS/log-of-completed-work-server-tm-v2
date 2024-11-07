import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import TypeWork from '#models/type_work'
import { typeWorkValidator } from '#validators/type_work'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class TypeWorkService {
  static async getTypesWork(req: Request): Promise<{ meta: any; data: ModelObject[] }> {
    const { page, limit } = req.qs() as IQueryParams
    const typesWork = await TypeWork.query()
      .paginate(page, limit)

    return typesWork.serialize()
  }

  static async createTypeWork(req: Request, auth: Authenticator<Authenticators>): Promise<TypeWork> {
    const { user } = auth
    const validatedData = await req.validateUsing(typeWorkValidator)
    const typeWork = await TypeWork.create({ userId: user?.id, ...validatedData })

    return typeWork
  }

  static async updateTypeWork(req: Request, params: IParams): Promise<TypeWork> {
    const typeWork = await TypeWork.findOrFail(params.id)
    const validatedData = await req.validateUsing(typeWorkValidator)
    const updTypeWork = await typeWork.merge(validatedData).save()

    return updTypeWork
  }

  static async deleteTypeWork(params: IParams): Promise<void> {
    const typeWork = await TypeWork.findOrFail(params.id)

    await typeWork.delete()
  }
}
