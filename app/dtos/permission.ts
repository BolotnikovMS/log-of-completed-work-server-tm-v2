import { BaseModelDto } from '@adocasts.com/dto/base'
import Permission from '#models/permission'

export default class PermissionDto extends BaseModelDto {
  declare id: number
  declare access: string
  declare description: string

  constructor(permission?: Permission) {
    super()

    if (!permission) return
    
    this.id = permission.id
    this.access = permission.access
    this.description = permission.description
  }
}