import ChannelingEquipment from '#channeling_equipment/models/channeling_equipment'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class ChannelingEquipmentDto extends BaseModelDto {
  declare id: number
  declare channelTypeId: number
  declare name: string
  declare channel_type: string | null

  constructor(channelingEquipment?: ChannelingEquipment) {
    super()

    if (!channelingEquipment) return

    this.id = channelingEquipment.id
    this.channelTypeId = channelingEquipment.channelTypeId
    this.name = channelingEquipment.name
    this.channel_type = channelingEquipment.channel_type?.name ?? null
  }
}
