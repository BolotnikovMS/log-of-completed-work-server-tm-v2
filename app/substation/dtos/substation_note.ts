import type Substation from '#substation/models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationNoteDto extends BaseModelDto {
  declare id: number
  declare note: string | null

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.note = substation.note
  }
}
