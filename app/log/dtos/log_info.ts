import { TLogAction } from '#domains/logs/types/index'
import Log from '#log/models/log'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class LogInfoDto extends BaseModelDto {
  declare id: number
  declare user: string | null
  declare url: string | null
  declare method: string | null
  declare statusCode: number | null
  declare action: TLogAction
  declare errorType: string | null
  declare errorMessage: string | null
  declare model: string | null
  declare data: string | null
  declare changes: string | null
  declare ipAddress: string | null
  declare createdAt: string

  constructor(log?: Log) {
    super()

    if (!log) return

    this.id = log.id
    this.user = log.user ? log.user.shortName : 'none'
    this.url = log.url
    this.method = log.method
    this.statusCode = log.statusCode
    this.action = log.action
    this.errorType = log.errorType
    this.errorMessage = log.errorMessage
    this.model = log.model
    this.data = log.data
    this.changes = log.changes
    this.ipAddress = log.ipAddress
    this.createdAt = log.createdAt.toISO()!
  }
}
