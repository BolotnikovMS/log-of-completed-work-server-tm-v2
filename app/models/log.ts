import { ELogActionType, ELogStatus } from '#domains/logs/enums/index'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare actionType: ELogActionType

  @column()
  declare entityType: string

  @column()
  declare entityId: number | null

  @column()
  declare userIpAddress: string

  @column()
  declare additionalData: string | null

  @column()
  declare status: ELogStatus

  @column()
  declare errorMessage: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
