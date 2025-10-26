import SubstationTelemechanicsDevicesDto from '#dtos/substations/substation_telemechanics_devices'
import Substation from '#models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationsTelemechanicsDevicesReportDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare rdu: boolean
  declare note: string | null
  declare district: string | null
  declare object_type: string | null
  declare telemechanics_device: SubstationTelemechanicsDevicesDto[] | null

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.name = substation.fullNameSubstation ?? substation.name
    this.rdu = substation.rdu
    this.note = substation.note
    this.district = substation.district?.name
    this.object_type = substation.object_type?.shortName
    this.telemechanics_device = SubstationTelemechanicsDevicesDto.fromArray(substation.telemechanics_device) ?? null
  }
}
