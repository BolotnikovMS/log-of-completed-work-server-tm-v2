import { RolesEnum } from '#enums/roles'
import CompletedWork from '#models/completed_work'
import User from '#models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import BasePolicy from './base_policy.js'

export default class CompletedWorkPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.MODERATOR || user.roleId === RolesEnum.USER
  }

  edit(user: User, completedWork: CompletedWork): AuthorizerResponse {
    return completedWork.userId === user.id || user.roleId === RolesEnum.MODERATOR
  }

  delete(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }
}
