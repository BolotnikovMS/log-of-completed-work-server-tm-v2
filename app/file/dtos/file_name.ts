import File from '#file/models/file'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class FileNameDto extends BaseModelDto {
  declare id: number
  declare clientName: string

  constructor(file?: File) {
    super()

    if (!file) return

    this.id = file.id
    this.clientName = file.clientName
  }
}
