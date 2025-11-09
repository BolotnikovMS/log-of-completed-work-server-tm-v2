import { RolesEnum } from '#enums/roles'
import BasePolicy from '#policies/base_policy'
import User from '#user/models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TypeWorkPolicy extends BasePolicy {
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
