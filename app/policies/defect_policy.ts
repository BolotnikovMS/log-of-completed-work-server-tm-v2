import { RolesEnum } from '#shared/enums/roles'
import type User from '#user/models/user'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import BasePolicy from './base_policy.js'

export default class DefectPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.MODERATOR || user.roleId === RolesEnum.USER
  }

  edit(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.MODERATOR
  }

  delete(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }
}
