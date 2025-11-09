import BasePolicy from '#policies/base_policy'
import { RolesEnum } from '#shared/enums/roles'
import User from '#user/models/user'
import { type AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ChannelingEquipmentPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.MODERATOR
  }

  edit(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.MODERATOR
  }

  delete(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }
}
