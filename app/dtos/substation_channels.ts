import Channel from '#models/channel'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationChannelsDto extends BaseModelDto {
  declare id: number
  declare ipAddress: string | null
  declare note: string | null
  declare channel_category_short: string | null
  declare channel_type: string | null
  declare channel_equipment: string | null
  declare gsm: string | null

  constructor(channel?: Channel) {
    super()

    if (!channel) return

    this.id = channel.id
    this.ipAddress = channel.ipAddress
    this.note = channel.note
    this.channel_category_short = channel.channel_category?.shortName
    this.channel_type = channel.channel_type?.name
    this.channel_equipment = channel.channel_equipment?.name
    this.gsm = channel.gsm_operator?.name
  }
}
