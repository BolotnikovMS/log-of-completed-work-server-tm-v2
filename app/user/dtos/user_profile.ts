import User from '#user/models/user'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class UserProfileDto extends BaseModelDto {
  declare shortName: string
  declare position: string
  declare email: string
  declare role: string

  constructor(user?: User) {
    super()

    if (!user) return

    this.shortName = user.shortName
    this.position = user.position
    this.email = user.email
    this.role = user.role.name
  }
}
