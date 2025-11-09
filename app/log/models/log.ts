import type { TLogAction } from '#domains/logs/types/index'
import User from '#user/models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare url: string | null

  @column()
  declare method: string | null

  @column()
  declare statusCode: number | null

  @column()
  declare action: TLogAction

  @column()
  declare errorType: string | null

  @column()
  declare errorMessage: string | null

  @column()
  declare model: string | null

  @column()
  declare data: string | null

  @column()
  declare changes: string | null

  @column()
  declare ipAddress: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
