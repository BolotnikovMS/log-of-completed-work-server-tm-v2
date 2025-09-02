import { RolesEnum } from '#enums/roles'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class FilePolicy extends BasePolicy {
  uploadCSVFileSubstationKey(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.ADMIN
  }
}
