import type { CreateChanneltype, UpdateChanneltype } from '#channel_type/interfaces/channel_type'
import ChannelType from '#channel_type/models/channel_type'
import type { IQueryParams } from '#shared/interfaces/index'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class ChannelTypeService {
  static async getChannelTypes(filters: IQueryParams): Promise<ModelPaginatorContract<ChannelType>> {
    const { sort, order, page, limit } = filters
    const channelTypes = await ChannelType.query()
      .if(sort && order, (query) => query.orderBy(sort!, order))
      .paginate(page!, limit)

    return channelTypes
  }

  static async create(data: CreateChanneltype): Promise<ChannelType> {
    const channelType = await ChannelType.create(data)

    return channelType
  }

  static async update(id: number, data: UpdateChanneltype): Promise<ChannelType> {
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
