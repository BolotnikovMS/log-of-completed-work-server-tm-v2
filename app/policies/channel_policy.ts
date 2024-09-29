import { RolesEnum } from '#enums/roles'
import User from '#models/user'
import BasePolicy from '#policies/base_policy'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ChannelPolicy extends BasePolicy {
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
