import UserPermission from '#models/user_permission'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class UserPermissionDto extends BaseModelDto {
  declare id: number
  declare user_id: number
  declare permission_id: number

  constructor(userPermission?: UserPermission) {
    super()

    if (!userPermission) return

    this.id = userPermission.id
    this.user_id = userPermission.user_id
    this.permission_id = userPermission.permission_id
  }
}
