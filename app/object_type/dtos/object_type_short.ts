import ObjectType from '#object_type/models/object_type'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class ObjectTypeShortDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(objectType?: ObjectType) {
    super()

    if (!objectType) return

    this.id = objectType.id
    this.name = objectType.name
  }
}
