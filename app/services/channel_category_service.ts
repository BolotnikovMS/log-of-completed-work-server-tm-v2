import { OrderByEnums } from '#enums/sort'
import { IQueryParams } from '#interfaces/query_params'
import ChannelCategory from '#models/channel_category'
import { Request } from '@adonisjs/core/http'

export default class ChannelCategoryService {
  static async getChannelCategories(req: Request) {
    const { sort, order, page, limit } = req.qs() as IQueryParams
    const channelCategories = await ChannelCategory.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return channelCategories
  }
}
