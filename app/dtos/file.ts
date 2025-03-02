import SubstationInfoDto from '#dtos/substation_info'
import File from '#models/file'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class FileDto extends BaseModelDto {
  declare id: number
  declare userId: number
  declare substationId: number
  declare filePath: string
  declare clientName: string
  declare typeFile: string
  declare extname: string
  declare size: number
  declare createdAt: string
  declare substation: SubstationInfoDto | null
  declare author: string | null

  constructor(file?: File) {
    super()

    if (!file) return

    this.id = file.id
    this.userId = file.userId
    this.substationId = file.substationId
    this.filePath = file.filePath
    this.clientName = file.clientName
    this.typeFile = file.typeFile
    this.extname = file.extname
    this.size = file.size
    this.createdAt = file.createdAt.toString()!
    this.substation = file.substation && new SubstationInfoDto(file.substation)
    this.author = file.author.shortName
  }
}
