import ChannelingEquipment from '#models/channeling_equipment'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class ChannelingEquipmentShortDto extends BaseModelDto {
  declare id: number
  declare channelTypeId: number
  declare name: string

  constructor(channelingEquipment?: ChannelingEquipment) {
    super()

    if (!channelingEquipment) return

    this.id = channelingEquipment.id
    this.channelTypeId = channelingEquipment.channelTypeId
    this.name = channelingEquipment.name
  }
}
