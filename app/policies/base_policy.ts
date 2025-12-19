import { RolesEnum } from '#shared/enums/roles'
import User from '#user/models/user'
import { BasePolicy as BouncerBasePolicy } from '@adonisjs/bouncer'
import logger from '@adonisjs/core/services/logger'

export default class BasePolicy extends BouncerBasePolicy {
  async before(user: User | null) {
    if (user?.roleId === RolesEnum.ADMIN) return true
  }
  async after(user: User | null, actionName: string, actionResult: any) {
    const userType = user ? 'User' : 'Guest'

    actionResult.authorized
      ? logger.info(`${userType} was authorized to ${actionName}`)
      : logger.info(`${userType} was denied to ${actionName} for ${actionResult.errorResponse}`)
  }
}
