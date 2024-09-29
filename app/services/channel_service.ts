import { OrderByEnums } from '#enums/sort'
import { IQueryParams } from '#interfaces/query_params'
import Channel from '#models/channel'
import { Request } from '@adonisjs/core/http'

export default class ChannelService {
  static async getChannels(req: Request) {
    const { sort, order, page, limit } = req.qs() as IQueryParams
    const channels = await Channel.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return channels
  }
}
