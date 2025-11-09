import User from '#user/models/user'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class UserBaseDto extends BaseModelDto {
  declare id: number
  declare active: boolean
  declare username: string
  declare role: string
  declare email: string
  declare shortName: string
  declare fullName: string

  constructor(user?: User) {
    super()

    if (!user) return

    this.id = user.id
    this.active = user.active
    this.username = user.username
    this.role = user.role.name
    this.email = user.email
    this.shortName = user.shortName
    this.fullName = user.fullName
  }
}
