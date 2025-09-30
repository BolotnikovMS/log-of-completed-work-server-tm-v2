import Substation from '#models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'
import { SubstationChannelsDto, SubstationFileListDto, SubstationTelemechanicsDevicesDto } from './index.js'

export default class SubstationInfoDto extends BaseModelDto {
  declare id: number
  declare active: boolean
  declare name: string
  declare rdu: boolean
  declare note: string | null
  declare fullNameSubstation: string
  declare district: string | null
  declare files_photos_ps: SubstationFileListDto[]
  declare files_backups: SubstationFileListDto[]
  declare other_files: SubstationFileListDto[]
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
    this.note = substation.note
    this.fullNameSubstation = substation.fullNameSubstation ?? substation.name
    this.district = substation.district?.name
    this.files_photos_ps = SubstationFileListDto.fromArray(substation.files_photos_ps)
    this.files_backups = SubstationFileListDto.fromArray(substation.files_backups)
    this.other_files = SubstationFileListDto.fromArray(substation.other_files)
    this.channels = SubstationChannelsDto.fromArray(substation.channels)
    this.object_type = substation.object_type?.shortName
    this.keyDefectSubstation = substation.keyDefectSubstation
    this.telemechanics_devices = SubstationTelemechanicsDevicesDto.fromArray(substation.telemechanics_device)
  }
}
