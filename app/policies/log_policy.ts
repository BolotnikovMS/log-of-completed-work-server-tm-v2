import { RolesEnum } from '#enums/roles'
import User from '#user/models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class LogPolicy extends BasePolicy {
  viewLog(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }
}
