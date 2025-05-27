import Substation from '#models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationDto extends BaseModelDto {
  declare id: number
  declare active: boolean
  declare districtId: number
  declare voltageClassesId: number
  declare typeKpId: number
  declare headControllerId: number
  declare objectTypeId: number
  declare name: string
  declare rdu: boolean
  declare note: string | null

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.active = substation.active
    this.districtId = substation.districtId
    this.voltageClassesId = substation.voltageClassesId
    this.typeKpId = substation.typeKpId
    this.headControllerId = substation.headControllerId
    this.objectTypeId = substation.objectTypeId
    this.name = substation.name
    this.rdu = substation.rdu
    this.note = substation.note
  }
}
