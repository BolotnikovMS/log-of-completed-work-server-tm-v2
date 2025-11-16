import type { QueryParams } from '#shared/interfaces/index'
import type { CreateTypeWork, UpdateTypeWort } from '#type_work/interfaces/type_work'
import TypeWork from '#type_work/models/type_work'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class TypeWorkService {
  static async getTypesWork(filters: QueryParams): Promise<ModelPaginatorContract<TypeWork>> {
    const { page, limit } = filters
    const typesWork = await TypeWork.query()
      .paginate(page!, limit)

    return typesWork
  }

  static async createTypeWork(data: CreateTypeWork): Promise<TypeWork> {
    const typeWork = await TypeWork.create(data)

    return typeWork
  }

  static async updateTypeWork(id: number, data: UpdateTypeWort): Promise<TypeWork> {
    const typeWork = await TypeWork.findOrFail(id)
    const updTypeWork = await typeWork.merge(data).save()

    return updTypeWork
  }

  static async deleteTypeWork(id: number): Promise<void> {
    const typeWork = await TypeWork.findOrFail(id)

    await typeWork.delete()

    return
  }
}
