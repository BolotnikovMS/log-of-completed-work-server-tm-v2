import Channel from '#channel/models/channel'
import type { CreateChannel, QueryParamsChannel, UpdateChannel } from '#channel/types/index'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class ChannelService {
  static async getChannels(filters: QueryParamsChannel): Promise<ModelPaginatorContract<Channel>> {
    const { sort = 'substationId', order = 'asc', page, limit, substation, channelType, channelCategory } = filters
    const channels = await Channel.query()
      .if(sort && order, (query) => query.orderBy(sort, order))
      .if(substation, (query) => query.where('substationId', '=', substation!))
      .if(channelType, (query) => query.where('channelTypeId', '=', channelType!))
      .if(channelCategory, (query) => query.where('channelCategoryId', '=', channelCategory!))
      .preload('substation', (query) => {
        query.preload('voltage_class')
        query.preload('object_type')
      })
      .preload('channel_category')
      .preload('channel_type')
      .preload('channel_equipment')
      .preload('gsm_operator')
      .paginate(page!, limit)

    return channels
  }

  static async findById(id: number): Promise<Channel> {
    const channel = await Channel.findOrFail(id)

    await channel.load('substation', query => {
      query.preload('voltage_class')
      query.preload('object_type')
    })
    await channel.load('channel_category')
    await channel.load('channel_type')
    await channel.load('channel_equipment')
    await channel.load('gsm_operator')

    return channel
  }

  static async create(data: CreateChannel): Promise<Channel> {
    const channel = await Channel.create(data)

    return channel
  }

  static async update(id: number, data: UpdateChannel): Promise<Channel> {
    const channel = await Channel.findOrFail(id)
    const updChannel = await channel.merge(data).save()

    return updChannel
  }

  static async deleteChannel(id: number): Promise<void> {
    const channel = await Channel.findOrFail(id)

    await channel.delete()

    return
  }
}
