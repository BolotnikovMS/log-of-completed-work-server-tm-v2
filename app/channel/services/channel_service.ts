import Channel from '#channel/models/channel'
import { channelValidator } from '#channel/validators/channel'
import { OrderByEnums } from '#enums/sort'
import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class ChannelService {
  static async getChannels(req: Request): Promise<{ meta: any, data: ModelObject[] }> {
    const { sort = 'substationId', order = 'asc', page, limit, substation, channelType, channelCategory } = req.qs() as IQueryParams
    const channels = await Channel.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(substation, (query) => query.where('substationId', '=', substation))
      .if(channelType, (query) => query.where('channelTypeId', '=', channelType))
      .if(channelCategory, (query) => query.where('channelCategoryId', '=', channelCategory))
      .preload('substation', (query) => {
        query.preload('voltage_class')
        query.preload('object_type')
      })
      .preload('channel_category')
      .preload('channel_type')
      .preload('channel_equipment')
      .preload('gsm_operator')
      .paginate(page, limit)

    return channels.serialize()
  }

  static async getChannelById(params: IParams): Promise<Channel> {
    const channel = await Channel.findOrFail(params.id)

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

  static async createChannel(req: Request, auth: Authenticator<Authenticators>): Promise<Channel> {
    const { user } = auth
    const validatedData = await req.validateUsing(channelValidator)
    const channel = await Channel.create({ userId: user?.id, ...validatedData })

    return channel
  }

  static async updateChannel(req: Request, params: IParams): Promise<Channel> {
    const channel = await Channel.findOrFail(params.id)
    const validatedData = await req.validateUsing(channelValidator)
    const updChannel = await channel.merge(validatedData).save()

    return updChannel
  }

  static async deleteChannel(params: IParams): Promise<void> {
    const channel = await Channel.findOrFail(params.id)

    await channel.delete()
  }
}
