import ChannelType from '#channel_type/models/channel_type'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class ChannelTypeDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(channelType?: ChannelType) {
    super()

    if (!channelType) return

    this.id = channelType.id
    this.name = channelType.name
  }
}
