import Role from '#models/role'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class RoleDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(role?: Role) {
    super()

    if (!role) return
    this.id = role.id
    this.name = role.name
  }
}
