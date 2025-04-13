import { BaseModelDto } from '@adocasts.com/dto/base'
import Substation from '#models/substation'
import { SubstationFileListDto } from '#dtos/substations/index'
import { ChannelInfoDto } from '#dtos/channels/index'

export default class SubstationsReportDto extends BaseModelDto {
  declare id: number
  declare active: boolean
  declare name: string
  declare nameSearch: string
  declare rdu: boolean
  declare note: string | null
  declare fullNameSubstation: string
  declare district: string | null
  declare type_kp: string | null
  declare head_controller: string | null
  declare files_photos_ps: SubstationFileListDto[]
  declare files_backups: SubstationFileListDto[]
  declare other_files: SubstationFileListDto[]
  declare channels: ChannelInfoDto[]
  declare object_type: string | null

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.active = substation.active
    this.name = substation.name
    this.nameSearch = substation.nameSearch
    this.rdu = substation.rdu
    this.note = substation.note
    this.fullNameSubstation = substation.fullNameSubstation
    this.district = substation.district?.name
    this.type_kp = substation.type_kp?.name
    this.head_controller = substation.head_controller?.name
    this.files_photos_ps = SubstationFileListDto.fromArray(substation.files_photos_ps)
    this.files_backups = SubstationFileListDto.fromArray(substation.files_backups)
    this.other_files = SubstationFileListDto.fromArray(substation.other_files)
    this.channels = ChannelInfoDto.fromArray(substation.channels)
    this.object_type = substation.object_type?.shortName
  }
}
