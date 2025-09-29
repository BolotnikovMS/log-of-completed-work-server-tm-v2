import { RolesEnum } from '#enums/roles'
import User from '#models/user'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import BasePolicy from './base_policy.js'

export default class TelemechanicsDevicePolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.MODERATOR
  }

  edit(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.MODERATOR
  }

  delete(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.MODERATOR
  }
}
