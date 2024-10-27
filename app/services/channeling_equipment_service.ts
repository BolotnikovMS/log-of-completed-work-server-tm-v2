import { IQueryParams } from '#interfaces/query_params'
import ChannelingEquipment from '#models/channeling_equipment'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class ChannelingEquipmentService {
  static async getChannelingEquipments(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { page, limit = -1, channelType } = req.qs() as IQueryParams
    const channelingEquipments = await ChannelingEquipment.query()
      .if(channelType, (query) => query.where('channelTypeId', '=', channelType))
      .preload('channel_type')
      .paginate(page, limit)

    return channelingEquipments.serialize()
  }
}
