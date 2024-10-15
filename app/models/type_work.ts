import { replacementEscapeSymbols } from '#helpers/replacement_escape_symbols'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class TypeWork extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare author: BelongsTo<typeof User>
}
