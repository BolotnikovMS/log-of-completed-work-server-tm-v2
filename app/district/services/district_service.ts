import District from '#district/models/district'
import type { CreateDistrict, UpdateDistrict } from '#district/types/district'
import type { BaseQueryParams } from '#shared/interfaces/query_params'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class DistrictService {
  static async getDistricts(filters: BaseQueryParams): Promise<ModelPaginatorContract<District>> {
    const { sort, order, page, limit, search } = filters
    const districts = await District.query()
      .if(search, (query) => query.whereLike('name', `%${search}%`))
      .if(sort && order, (query) => query.orderBy(sort!, order))
      .paginate(page!, limit)
    // const total: number = (await District.query().count('* as total'))[0].$extras.total
    // const total: number = districts.length

    return districts
  }

  static async findById(id: number): Promise<District> {
    const district = await District.findOrFail(id)

    return district
  }

  static async create(data: CreateDistrict): Promise<District> {
    const district = await District.create(data)

    return district
  }

  static async update(id: number, data: UpdateDistrict): Promise<District> {
    const district = await District.findOrFail(id)
    const updDistrict = await district.merge(data).save()

    return updDistrict
  }

  static async delete(id: number): Promise<void> {
    const district = await District.findOrFail(id)

    await district.delete()

    return
  }
}
