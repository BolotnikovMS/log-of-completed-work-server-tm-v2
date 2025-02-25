import { OrderByEnums } from '#enums/sort'
import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import ChannelCategory from '#models/channel_category'
import { channelCategoryValidator } from '#validators/channel_category'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class ChannelCategoryService {
  static async getChannelCategories(req: Request): Promise<{ meta: any, data: ModelObject[] }> {
    const { sort, order, page, limit } = req.qs() as IQueryParams
    const channelCategories = await ChannelCategory.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return channelCategories.serialize()
  }
  
  static async getChannelCategoryById(params: IParams): Promise<ChannelCategory> {
    const channelCategory = await ChannelCategory.findOrFail(params.id)

    return channelCategory
  }

  static async createChannelCategory(req: Request, auth: Authenticator<Authenticators>): Promise<ChannelCategory> {
    const { user } = auth
    const validatedData = await req.validateUsing(channelCategoryValidator)
    const channelCategory = await ChannelCategory.create({ userId: user?.id, ...validatedData })

    return channelCategory
  }

  static async updateChannelCategory(req: Request, params: IParams): Promise<ChannelCategory> {
    const channelCategory = await ChannelCategory.findOrFail(params.id)
    const validatedData = await req.validateUsing(channelCategoryValidator)
    const updChannelCategory = await channelCategory.merge(validatedData).save()

    return updChannelCategory
  }

  static async deleteChannelCategory(params: IParams): Promise<void> {
    const channelCategory = await ChannelCategory.findOrFail(params.id)

    await channelCategory.delete()
  }
}
