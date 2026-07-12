import type Substation from '#substation/models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationKeyDefectDto extends BaseModelDto {
  declare id: number
  declare keyDefectSubstation: number | null

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.keyDefectSubstation = substation.keyDefectSubstation
  }
}
