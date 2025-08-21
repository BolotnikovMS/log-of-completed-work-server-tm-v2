import { ELogActionType } from '#domains/logs/enums/index'
import Log from '#models/log'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class LogShortDto extends BaseModelDto {
  declare id: number
  declare actionType: ELogActionType
  declare entityType: string
  declare status: string
  declare createdAt: string
  declare user: string

  constructor(log?: Log) {
    super()

    if (!log) return

    this.id = log.id
    this.actionType = log.action
    this.entityType = log.action
    this.status = log.action
    this.createdAt = log.createdAt.toISO()!
    this.user = log.user.shortName
  }
}
