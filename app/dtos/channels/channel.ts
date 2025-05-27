import Channel from '#models/channel'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class ChannelDto extends BaseModelDto {
  declare id: number
  declare substationId: number
  declare channelCategoryId: number
  declare channelTypeId: number
  declare channelEquipmentId: number | null
  declare gsmId: number | null
  declare ipAddress: string | null
  declare note: string | null
  declare substation: string | null
  declare channel_category: string | null
  declare channel_category_short: string | null
  declare channel_type: string | null
  declare channel_equipment: string | null
  declare gsm: string | null

  constructor(channel?: Channel) {
    super()

    if (!channel) return

    this.id = channel.id
    this.substationId = channel.substationId
    this.channelCategoryId = channel.channelCategoryId
    this.channelTypeId = channel.channelTypeId
    this.channelEquipmentId = channel.channelEquipmentId
    this.gsmId = channel.gsmId
    this.ipAddress = channel.ipAddress
    this.note = channel.note
    this.substation = channel.substation?.fullNameSubstation
    this.channel_category = channel.channel_category?.name
    this.channel_category_short = channel.channel_category?.shortName
    this.channel_type = channel.channel_type?.name
    this.channel_equipment = channel.channel_equipment?.name
    this.gsm = channel.gsm_operator?.name
  }
}
