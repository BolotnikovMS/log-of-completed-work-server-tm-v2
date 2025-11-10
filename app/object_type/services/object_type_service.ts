import ObjectType from '#object_type/models/object_type'
import { objectTypeValidator } from '#object_type/validators/object_type'
import { IParams, IQueryParams } from '#shared/interfaces/index'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class ObjectTypeService {
  static async getObjectTypes(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { page, limit = -1 } = req.qs() as IQueryParams
    const objectTypes = await ObjectType.query()
      .paginate(page, limit)

    return objectTypes.serialize()
  }

  static async getObjectTypeById(params: IParams): Promise<ObjectType> {
    const objectType = await ObjectType.findOrFail(params.id)

    return objectType
  }

  static async createObjectType(req: Request, auth: Authenticator<Authenticators>): Promise<ObjectType> {
    const { user } = auth
    const validatedData = await req.validateUsing(objectTypeValidator)
    const objectType = await ObjectType.create({ userId: user?.id, ...validatedData })

    return objectType
  }

  static async updateObjectType(req: Request, params: IParams): Promise<ObjectType> {
    const objectType = await ObjectType.findOrFail(params.id)
    const validatedData = await req.validateUsing(objectTypeValidator)
    const updObjectType = await objectType.merge(validatedData).save()

    return updObjectType
  }

  static async deleteObjectType(params: IParams): Promise<void> {
    const objectType = await ObjectType.findOrFail(params.id)

    await objectType.delete()
  }
}
