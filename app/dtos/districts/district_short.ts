import District from '#models/district'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class DistrictShortDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(district?: District) {
    super()

    if (!district) return

    this.id = district.id
    this.name = district.name
  }
}
