import District from '#district/models/district'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class DistrictDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare shortName: string

  constructor(district?: District) {
    super()

    if (!district) return

    this.id = district.id
    this.name = district.name
    this.shortName = district.shortName
  }
}
