import Log from '#models/log'
import { BaseModelDto } from '@adocasts.com/dto/base'
import { TLogAction } from '../types/index.js'

export default class LogShortDto extends BaseModelDto {
  declare id: number
  declare user: string | null
  declare url: string | null
  declare method: string | null
  declare action: TLogAction
  declare createdAt: string

  constructor(log?: Log) {
    super()

    if (!log) return

    this.id = log.id
    this.user = log.user ? log.user.shortName : 'none'
    this.url = log.url
    this.method = log.method
    this.action = log.action
    this.createdAt = log.createdAt.toISO()!
  }
}
