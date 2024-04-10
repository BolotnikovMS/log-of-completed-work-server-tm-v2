import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

import Substation from '#models/substation'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'

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

  @column({
    prepare: (value: Date) => DateTime.expandFormat(value.toLocaleDateString()),
  })
  declare dateCompletion: DateTime | Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>

  @belongsTo(() => User)
  declare work_producer: BelongsTo<typeof User>
}
