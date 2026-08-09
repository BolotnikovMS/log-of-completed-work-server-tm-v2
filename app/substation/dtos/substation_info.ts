import Substation from '#substation/models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'
import { SubstationChannelsDto, SubstationTelemechanicsDevicesDto } from './index.js'

export default class SubstationInfoDto extends BaseModelDto {
  declare id: number
  declare active: boolean
  declare name: string
  declare rdu: boolean
  declare fullNameSubstation: string
  declare district: string | null
  declare channels: SubstationChannelsDto[]
  declare object_type: string | null
  declare keyDefectSubstation: number | null
  declare telemechanics_devices: SubstationTelemechanicsDevicesDto[]

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.active = substation.active
    this.rdu = substation.rdu
    this.fullNameSubstation = substation.fullNameSubstation ?? substation.name
    this.district = substation.district?.name
    this.channels = SubstationChannelsDto.fromArray(substation.channels)
    this.object_type = substation.object_type?.shortName
    this.keyDefectSubstation = substation.keyDefectSubstation
    this.telemechanics_devices = SubstationTelemechanicsDevicesDto.fromArray(substation.telemechanics_device)
  }
}
