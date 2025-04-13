import { BaseModelDto } from '@adocasts.com/dto/base'
import Channel from '#models/channel'

export default class ChannelInfoDto extends BaseModelDto {
  declare id: number
  declare ipAddress: string | null
  declare note: string | null
  declare substation: string | null
  declare channel_category: string | null
  declare channel_type: string | null
  declare gsm_operator: string | null
  declare channel_equipment: string | null

  constructor(channel?: Channel) {
    super()

    if (!channel) return

    this.id = channel.id
    this.ipAddress = channel?.ipAddress
    this.note = channel?.note
    this.substation = channel.substation?.fullNameSubstation
    this.channel_category = channel.channel_category?.name
    this.channel_type = channel.channel_type?.name
    this.gsm_operator = channel.gsm_operator?.name
    this.channel_equipment = channel.channel_equipment?.name
  }
}
