import ChannelCategory from '#models/channel_category'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class ChannelCategoryDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare shortName: string

  constructor(channelCategory?: ChannelCategory) {
    super()

    if (!channelCategory) return

    this.id = channelCategory.id
    this.name = channelCategory.name
    this.shortName = channelCategory.shortName
  }
}
