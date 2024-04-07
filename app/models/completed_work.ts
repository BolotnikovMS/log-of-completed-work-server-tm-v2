import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

import Substation from '#models/substation'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class CompletedWork extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare substationId: number

  @column()
  declare workProducerId: number

  @column()
  declare description: string

  @column()
  declare note: string | null

  @column()
  declare dateCompletion: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>
}
