import ChannelDto from '#dtos/channel'
import FileDto from '#dtos/file'
import Substation from '#models/substation'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationDto extends BaseModelDto {
  declare id: number
  declare active: boolean
  declare districtId: number
  declare voltageClassesId: number
  declare typeKpId: number
  declare headControllerId: number
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
  declare channels: ChannelDto[]

  constructor(substation?: Substation) {
    super()

    if (!substation) return

    this.id = substation.id
    this.active = substation.active
    this.districtId = substation.districtId
    this.voltageClassesId = substation.voltageClassesId
    this.typeKpId = substation.typeKpId
    this.headControllerId = substation.headControllerId
    this.name = substation.name
    this.rdu = substation.rdu
    this.note = substation.note
    this.fullNameSubstation = substation.fullNameSubstation
    this.district = substation.district?.name
    this.type_kp = substation.type_kp?.name
    this.head_controller = substation.head_controller?.name
    this.files_photos_ps = FileDto.fromArray(substation.files_photos_ps)
    this.files_backups = FileDto.fromArray(substation.files_backups)
    this.other_files = FileDto.fromArray(substation.other_files)
    this.channels = ChannelDto.fromArray(substation.channels)
  }
}
