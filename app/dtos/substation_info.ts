import FileDto from '#dtos/file'
import SubstationChannelsDto from '#dtos/substation_channels'
import Substation from '#models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationInfoDto extends BaseModelDto {
  declare id: number
  declare active: boolean
  declare name: string
  declare rdu: boolean
  declare note: string | null
  declare fullNameSubstation: string
  declare district: string | null
  declare type_kp: string | null
  declare head_controller: string | null
  declare files_photos_ps: FileDto[]
  declare files_backups: FileDto[]
  declare other_files: FileDto[]
  declare channels: SubstationChannelsDto[]
  declare object_type: string | null

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.active = substation.active
    this.rdu = substation.rdu
    this.note = substation.note
    this.fullNameSubstation = substation.fullNameSubstation ?? substation.name
    this.district = substation.district?.name
    this.type_kp = substation.type_kp?.name
    this.head_controller = substation.head_controller?.name
    this.files_photos_ps = FileDto.fromArray(substation.files_photos_ps)
    this.files_backups = FileDto.fromArray(substation.files_backups)
    this.other_files = FileDto.fromArray(substation.other_files)
    this.channels = SubstationChannelsDto.fromArray(substation.channels)
    this.object_type = substation.object_type?.shortName
  }
}
