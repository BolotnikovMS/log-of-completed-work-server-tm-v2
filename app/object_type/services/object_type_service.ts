import ObjectType from '#object_type/models/object_type'
import type { CreateTypeObject, UpdateTypeObject } from '#object_type/types/object_type'
import type { BaseQueryParams } from '#shared/interfaces/query_params'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class ObjectTypeService {
  static async getObjectTypes(filters: BaseQueryParams): Promise<ModelPaginatorContract<ObjectType>> {
    const { page, limit } = filters
    const objectTypes = await ObjectType.query()
      .paginate(page!, limit)

    return objectTypes
  }

  static async findById(id: number): Promise<ObjectType> {
    const objectType = await ObjectType.findOrFail(id)

    return objectType
  }

  static async create(data: CreateTypeObject): Promise<ObjectType> {
    const objectType = await ObjectType.create(data)

    return objectType
  }

  static async update(id: number, data: UpdateTypeObject): Promise<ObjectType> {
    const objectType = await ObjectType.findOrFail(id)
    const updObjectType = await objectType.merge(data).save()

    return updObjectType
  }

  static async delete(id: number): Promise<void> {
    const objectType = await ObjectType.findOrFail(id)

    await objectType.delete()

    return
  }
}
