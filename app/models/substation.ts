import Channel from '#models/channel'
import CompletedWork from '#models/completed_work'
import District from '#models/district'
import File from '#models/file'
import HeadController from '#models/head_controller'
import TypeKp from '#models/type_kp'
import VoltageClass from '#models/voltage_class'
import { BaseModel, belongsTo, column, computed, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Substation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column({
    consume: (value: string): boolean => Boolean(value),
  })
  declare active: boolean

  @column()
  declare districtId: number

  @column()
  declare voltageClassesId: number

  @column()
  declare typeKpId: number

  @column()
  declare headControllerId: number

  @column()
  declare name: string

  @column()
  declare nameSearch: string

  @column({
    consume: (value: string): boolean => Boolean(value),
  })
  declare rdu: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get fullNameSubstation() {
    return `ПС ${this.voltage_class?.name} кВ ${this.name}`
  }

  @hasMany(() => CompletedWork)
  declare works: HasMany<typeof CompletedWork>

  @belongsTo(() => District)
  declare district: BelongsTo<typeof District>

  @belongsTo(() => VoltageClass, {
    localKey: 'id',
    foreignKey: 'voltageClassesId',
  })
  declare voltage_class: BelongsTo<typeof VoltageClass>

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

  @hasMany(() => File, {
    onQuery: (query) => query.where('type_file', '=', 'photo_ps'),
  })
  declare files_photos_ps: HasMany<typeof File>

  @hasMany(() => File, {
    onQuery: (query) => query.where('type_file', '=', 'backup'),
  })
  declare files_backups: HasMany<typeof File>

  @hasMany(() => File, {
    onQuery: (query) => query.where('type_file', '=', 'other_files'),
  })
  declare other_files: HasMany<typeof File>

  @hasMany(() => Channel)
  declare channels: HasMany<typeof Channel>
}
