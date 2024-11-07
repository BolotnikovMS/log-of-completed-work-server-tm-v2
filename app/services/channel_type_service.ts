import { IParams } from '#interfaces/params'
import ChannelType from '#models/channel_type'
import { chanelTypeValidator } from '#validators/channel_type'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class ChannelTypeService {
  static async getChannelTypes(req: Request): Promise<{ meta: any, data: ModelObject[] }> {
    const { sort, order, page, limit } = req.qs() as IQueryParams
    const channelTypes = await ChannelType.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return channelTypes.serialize()
  }

  static async createChannelType(req: Request, auth: Authenticator<Authenticators>): Promise<ChannelType> {
    const { user } = auth
    const validatedData = await req.validateUsing(chanelTypeValidator)
    const channelType = await ChannelType.create({ userId: user?.id, ...validatedData })

    return channelType
  }

  static async updateChannelType(req: Request, params: IParams): Promise<ChannelType> {
    const channelType = await ChannelType.findOrFail(params.id)
    const validatedData = await req.validateUsing(chanelTypeValidator)
    const updChannelType = await channelType.merge(validatedData).save()

    return updChannelType
  }

  static async deleteChannelType(params: IParams): Promise<void> {
    const channelType = await ChannelType.findOrFail(params.id)

    await channelType.delete()
  }
}
