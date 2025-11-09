import Substation from '#substation/models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationSelectOptionDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.name = substation.fullNameSubstation ?? substation.name
  }
}
