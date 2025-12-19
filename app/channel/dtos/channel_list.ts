import Channel from '#channel/models/channel'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class ChannelListDto extends BaseModelDto {
  declare id: number
  declare substationId: number
  declare substation: string
  declare channel_category_short: string
  declare channel_type: string

  constructor(channel?: Channel) {
    super()

    if (!channel) return

    this.id = channel.id
    this.substationId = channel.substationId
    this.substation = channel.substation?.fullNameSubstation
    this.channel_category_short = channel.channel_category?.shortName
    this.channel_type = channel.channel_type?.name
  }
}
