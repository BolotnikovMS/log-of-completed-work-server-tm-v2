import { BaseModelDto } from '@adocasts.com/dto/base'
import ObjectType from '#models/object_type'

export default class ObjectTypeListsDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(objectType?: ObjectType) {
    super()

    if (!objectType) return
    
    this.id = objectType.id
    this.name = objectType.name
  }
}