import District from '#district/models/district'
import { districtValidator } from '#district/validators/district'
import { OrderByEnums } from '#enums/sort'
import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class DistrictService {
  static async getDistricts(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { sort, order, page, limit = -1, search } = req.qs() as IQueryParams
    const districts = await District.query()
      .if(search, (query) => query.whereLike('name', `%${search}%`))
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)
    // const total: number = (await District.query().count('* as total'))[0].$extras.total
    // const total: number = districts.length

    return districts.serialize()
  }

  static async getDistrictById(params: IParams): Promise<District> {
    const district = await District.findOrFail(params.id)

    return district
  }

  static async createDistrict(req: Request, auth: Authenticator<Authenticators>): Promise<District> {
    const { user } = auth
    const validatedData = await req.validateUsing(districtValidator)
    const district = await District.create({ userId: user?.id, ...validatedData })

    return district
  }

  static async updateDistrict(req: Request, params: IParams): Promise<District> {
    const district = await District.findOrFail(params.id)
    const validatedData = await req.validateUsing(districtValidator)
    const updDistrict = await district.merge(validatedData).save()

    return updDistrict
  }

  static async deleteDistrict(params: IParams): Promise<void> {
    const district = await District.findOrFail(params.id)

    await district.delete()
  }
}
