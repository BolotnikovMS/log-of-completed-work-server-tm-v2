import User from '#user/models/user'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class UserShortDto extends BaseModelDto {
  declare id: number
  declare fullName: string

  constructor(user?: User) {
    super()

    if (!user) return

    this.id = user.id
    this.fullName = user.fullName
  }
}
