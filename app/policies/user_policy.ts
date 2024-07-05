import { RolesEnum } from '#enums/roles'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }

  edit(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }

  delete(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }

  viewRoles(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }

  resetPassword(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }

  blockAccount(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }
}
