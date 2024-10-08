import { IQueryParams } from '#interfaces/query_params'
import ChannelingEquipment from '#models/channeling_equipment'
import { Request } from '@adonisjs/core/http'

export default class ChannelingEquipmentService {
  static async getChannelingEquipments(req: Request) {
    const { page, limit, channelType } = req.qs() as IQueryParams
    const channelingEquipments = await ChannelingEquipment.query()
      .if(channelType, (query) => query.where('channelTypeId', '=', channelType))
      .preload('channel_type')
      .paginate(page, limit)

    const channelingEquipmentsSerialize = channelingEquipments.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt']
      },
      relations: {
        channel_type: {
          fields: {
            pick: ['id', 'name']
          }
        }
      }
    })

    return channelingEquipmentsSerialize
  }
}
