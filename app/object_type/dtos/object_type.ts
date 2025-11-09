import ObjectType from '#object_type/models/object_type'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class ObjectTypeDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare shortName: string

  constructor(objectType?: ObjectType) {
    super()

    if (!objectType) return

    this.id = objectType.id
    this.name = objectType.name
    this.shortName = objectType.shortName
  }
}
