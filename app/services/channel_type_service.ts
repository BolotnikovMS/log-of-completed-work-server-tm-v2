import ChannelType from '#models/channel_type'
import { Request } from '@adonisjs/core/http'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class ChannelTypeService {
  static async getChannelTypes(req: Request): Promise<ChannelType[]> {
    const { sort, order } = req.qs() as IQueryParams
    const channelTypes = await ChannelType.query().if(sort && order, (query) =>
      query.orderBy(sort, OrderByEnums[order])
    )

    return channelTypes
  }
}
