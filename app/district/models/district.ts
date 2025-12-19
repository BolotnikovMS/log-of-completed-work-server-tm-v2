import { replacementEscapeSymbols } from '#shared/helpers/replacement_escape_symbols'
import Substation from '#substation/models/substation'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class District extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare name: string

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare shortName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Substation)
  declare substations: HasMany<typeof Substation>
}
