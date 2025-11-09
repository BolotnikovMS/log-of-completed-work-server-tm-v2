import TypeKp from '#type_kp/models/type_kp'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class TypeKpDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(typeKp?: TypeKp) {
    super()

    if (!typeKp) return

    this.id = typeKp.id
    this.name = typeKp.name
  }
}
