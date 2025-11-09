import User from '#user/models/user'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class UserFullDto extends BaseModelDto {
  declare id: number
  declare roleId: number
  declare active: boolean
  declare username: string
  declare surname: string
  declare name: string
  declare patronymic: string
  declare position: string
  declare email: string
  declare fullName: string
  declare shortName: string
  declare role: string

  constructor(user?: User) {
    super()

    if (!user) return

    this.id = user.id
    this.roleId = user.roleId
    this.active = user.active
    this.username = user.username
    this.surname = user.surname
    this.name = user.name
    this.patronymic = user.patronymic
    this.position = user.position
    this.email = user.email
    this.fullName = user.fullName
    this.shortName = user.shortName
    this.role = user.role.name
  }
}
