import type { QueryParams } from '#shared/interfaces/index'
import type { CreateTypeKp, UpdateTypeKp } from '#type_kp/interfaces/type_kp'
import TypeKp from '#type_kp/models/type_kp'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class TypeKpService {
  static async getTypesKps(filters: QueryParams): Promise<ModelPaginatorContract<TypeKp>> {
    const { sort, order, page, limit } = filters
    const typesKps = await TypeKp.query()
      .if(sort && order, (query) => query.orderBy(sort!, order))
      .paginate(page!, limit)

    return typesKps
  }

  static async create(data: CreateTypeKp): Promise<TypeKp> {
    const typeKp = await TypeKp.create(data)

    return typeKp
  }

  static async update(id: number, data: UpdateTypeKp): Promise<TypeKp> {
    const typeKp = await TypeKp.findOrFail(id)
    const updTypeKp = await typeKp.merge(data).save()

    return updTypeKp
  }

  static async delete(id: number): Promise<void> {
    const typeKp = await TypeKp.findOrFail(id)

    await typeKp.delete()

    return
  }
}
