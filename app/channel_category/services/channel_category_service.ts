import type { CreateChannelCategory, UpdateChannelCategory } from '#channel_category/interfaces/channel_category'
import ChannelCategory from '#channel_category/models/channel_category'
import type { IQueryParams } from '#shared/interfaces/index'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class ChannelCategoryService {
  static async getChannelCategories(filters: IQueryParams): Promise<ModelPaginatorContract<ChannelCategory>> {
    const { sort, order, page, limit } = filters
    const channelCategories = await ChannelCategory.query()
      .if(sort && order, (query) => query.orderBy(sort!, order))
      .paginate(page!, limit)

    return channelCategories
  }

  static async findById(id: number): Promise<ChannelCategory> {
    const channelCategory = await ChannelCategory.findOrFail(id)

    return channelCategory
  }

  static async create(data: CreateChannelCategory): Promise<ChannelCategory> {
    const channelCategory = await ChannelCategory.create(data)

    return channelCategory
  }

  static async update(id: number, data: UpdateChannelCategory): Promise<ChannelCategory> {
    const channelCategory = await ChannelCategory.findOrFail(id)
    const updChannelCategory = await channelCategory.merge(data).save()

    return updChannelCategory
  }

  static async delete(id: number): Promise<void> {
    const channelCategory = await ChannelCategory.findOrFail(id)

    await channelCategory.delete()

    return
  }
}
