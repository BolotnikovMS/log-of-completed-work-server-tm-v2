import { replacementEscapeSymbols } from '#shared/helpers/replacement_escape_symbols'
import { BaseModel, column } from '@adonisjs/lucid/orm'

import { DateTime } from 'luxon'

export default class VoltageClass extends BaseModel {
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
}
