import ChannelingEquipment from '#channeling_equipment/models/channeling_equipment'
import type { CreateChannelingEquipment, QueryParamsChannelEquip, UpdateChannelingEquipment } from '#channeling_equipment/types/index'

export default class ChannelingEquipmentService {
  static async getChannelingEquipments(filters: QueryParamsChannelEquip) {
    const { page, limit, channelType } = filters
    const channelingEquipments = await ChannelingEquipment.query()
      .if(channelType, (query) => query.where('channelTypeId', '=', channelType!))
      .preload('channel_type')
      .paginate(page!, limit)

    return channelingEquipments
  }

  static async getChannelingEquipmentById(id: number): Promise<ChannelingEquipment> {
    const equipment = await ChannelingEquipment.findOrFail(id)

    return equipment
  }

  static async create(data: CreateChannelingEquipment): Promise<ChannelingEquipment> {
    const equipment = await ChannelingEquipment.create(data)

    return equipment
  }

  static async update(id: number, data: UpdateChannelingEquipment): Promise<ChannelingEquipment> {
    const equipment = await ChannelingEquipment.findOrFail(id)
    const updEquipment = await equipment.merge(data).save()

    return updEquipment
  }

  static async delete(id: number): Promise<void> {
    const equipment = await ChannelingEquipment.findOrFail(id)

    await equipment.delete()

    return
  }
}
