import TypeWork from '#type_work/models/type_work'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class TypeWorkDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(typeWork?: TypeWork) {
    super()

    if (!typeWork) return
    this.id = typeWork.id
    this.name = typeWork.name
  }
}
