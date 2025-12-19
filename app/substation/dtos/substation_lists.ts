import Substation from '#substation/models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'
import SubstationListTelemechanicsDevicesDto from './substation_list_telemechanics_devices.js'

export default class SubstationListDto extends BaseModelDto {
  declare id: number
  declare object_type: string | null
  declare name: string
  declare rdu: boolean
  declare fullNameSubstation: string
  declare telemechanics_devices: SubstationListTelemechanicsDevicesDto[] | null

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.rdu = substation.rdu
    this.fullNameSubstation = substation.fullNameSubstation ?? substation.name
    this.object_type = substation.object_type?.shortName
    this.telemechanics_devices = SubstationListTelemechanicsDevicesDto.fromArray(substation.telemechanics_device) ?? null
  }
}
