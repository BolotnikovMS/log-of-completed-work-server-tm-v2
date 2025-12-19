import File from '#file/models/file'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationFileListDto extends BaseModelDto {
  declare id: number
  declare filePath: string
  declare clientName: string
  declare size: number
  declare createdAt: string
  declare author: string | null

  constructor(file?: File) {
    super()

    if (!file) return

    this.id = file.id
    this.filePath = file.filePath
    this.clientName = file.clientName
    this.size = file.size
    this.createdAt = file.createdAt.toString()!
    this.author = file.author.shortName
  }
}
