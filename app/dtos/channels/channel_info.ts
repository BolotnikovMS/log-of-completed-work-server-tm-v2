import { BaseModelDto } from '@adocasts.com/dto/base'
import Channel from '#models/channel'
import { ChannelCategoryDto } from '#dtos/channel_categories/index'

export default class ChannelInfoDto extends BaseModelDto {
  declare id: number
  declare ipAddress: string | null
  declare note: string | null
  declare substation: string | null
  declare channel_category: ChannelCategoryDto | null
  declare channel_type: string | null
  declare channel_equipment: string | null

  constructor(channel?: Channel) {
    super()

    if (!channel) return

    this.id = channel.id
    this.ipAddress = channel.ipAddress
    this.note = channel.note
    this.substation = channel.substation.fullNameSubstation
    this.channel_category = channel.channel_category && new ChannelCategoryDto(channel.channel_category)
    this.channel_type = channel.channel_type.name
    this.channel_equipment = channel.channel_equipment.name
  }
}
