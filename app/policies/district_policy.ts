import { RolesEnum } from '#enums/roles'
import User from '#models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import BasePolicy from './base_policy.js'

export default class DistrictPolicy extends BasePolicy {
  // view(user: User): AuthorizerResponse {
  //   return user.roleId === RolesEnum.MODERATOR
  // }

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