import Substation from '#models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationListDto extends BaseModelDto {
  declare id: number
  declare object_type: string | null
  declare name: string
  declare rdu: boolean
  declare fullNameSubstation: string

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.rdu = substation.rdu
    this.fullNameSubstation = substation.fullNameSubstation ?? substation.name
    this.object_type = substation.object_type?.shortName
  }
}
