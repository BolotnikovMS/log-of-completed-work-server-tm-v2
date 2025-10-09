import { replacementEscapeSymbols } from '#helpers/replacement_escape_symbols'
import TelemechanicsDevice from '#models/telemechanics_device'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class HeadController extends BaseModel {
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
  declare actualFirmwareVersion?: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => TelemechanicsDevice)
  declare telemechanics_devices: HasMany<typeof TelemechanicsDevice>
}
