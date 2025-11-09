import Channel from '#channel/models/channel'
import { replacementEscapeSymbols } from '#helpers/replacement_escape_symbols'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class ChannelCategory extends BaseModel {
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

  @hasMany(() => Channel)
  declare channels: HasMany<typeof Channel>
}
