import Substation from '#models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationListDto extends BaseModelDto {
  declare id: number
  declare active: boolean
  declare districtId: number
  declare voltageClassesId: number
  declare typeKpId: number
  declare headControllerId: number
  declare objectTypeId: number
  declare object_type: string | null
  declare name: string
  declare rdu: boolean
  declare fullNameSubstation: string

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
    this.fullNameSubstation = substation.fullNameSubstation ?? substation.name
    this.object_type = substation.object_type?.shortName
  }
}
