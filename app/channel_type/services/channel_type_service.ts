import ChannelType from '#channel_type/models/channel_type'
import type { CreateChannelType, UpdateChannelType } from '#channel_type/types/channel_type'
import type { BaseQueryParams } from '#shared/interfaces/index'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class ChannelTypeService {
  static async getChannelTypes(filters: BaseQueryParams): Promise<ModelPaginatorContract<ChannelType>> {
    const { sort, order, page, limit } = filters
    const channelTypes = await ChannelType.query()
      .if(sort && order, (query) => query.orderBy(sort!, order))
      .paginate(page!, limit)

    return channelTypes
  }

  static async create(data: CreateChannelType): Promise<ChannelType> {
    const channelType = await ChannelType.create(data)

    return channelType
  }

  static async update(id: number, data: UpdateChannelType): Promise<ChannelType> {
    const channelType = await ChannelType.findOrFail(id)
    const updChannelType = await channelType.merge(data).save()

    return updChannelType
  }

  static async delete(id: number): Promise<void> {
    const channelType = await ChannelType.findOrFail(id)

    await channelType.delete()

    return
  }
}
