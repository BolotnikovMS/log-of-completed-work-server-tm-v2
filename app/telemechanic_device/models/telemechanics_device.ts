import HeadController from '#head_controller/models/head_controller'
import { replacementEscapeSymbols } from '#helpers/replacement_escape_symbols'
import Substation from '#substation/models/substation'
import TypeKp from '#type_kp/models/type_kp'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class TelemechanicsDevice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare substationId: number

  @column()
  declare typeKpId: number

  @column()
  declare headControllerId: number

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare controllerFirmwareVersion?: string | null

  @column()
  declare note?: string | null

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>

  @belongsTo(() => TypeKp)
  declare type_kp: BelongsTo<typeof TypeKp>

  @belongsTo(() => HeadController)
  declare head_controller: BelongsTo<typeof HeadController>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
