import HeadController from '#models/head_controller'
import Substation from '#models/substation'
import TypeKp from '#models/type_kp'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
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
  declare note?: string | null

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>

  @hasOne(() => TypeKp, {
    localKey: 'typeKpId',
    foreignKey: 'id',
  })
  declare type_kp: HasOne<typeof TypeKp>

  @hasOne(() => HeadController, {
    localKey: 'headControllerId',
    foreignKey: 'id',
  })
  declare head_controller: HasOne<typeof HeadController>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
