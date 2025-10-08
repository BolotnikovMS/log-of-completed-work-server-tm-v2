import HeadController from '#models/head_controller'
import Substation from '#models/substation'
import TypeKp from '#models/type_kp'
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

  @column()
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
