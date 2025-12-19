import Channel from '#channel/models/channel'
import CompletedWork from '#completed_work/models/completed_work'
import District from '#district/models/district'
import File from '#file/models/file'
import ObjectType from '#object_type/models/object_type'
import { replacementEscapeSymbols } from '#shared/helpers/replacement_escape_symbols'
import TelemechanicsDevice from '#telemechanic_device/models/telemechanics_device'
import VoltageClass from '#voltage_class/models/voltage_class'
import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
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
  declare objectTypeId: number

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value)
  })
  declare name: string

  @column()
  declare nameSearch: string

  @column({
    consume: (value: string): boolean => Boolean(value),
  })
  declare rdu: boolean

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare note: string | null

  @column()
  declare keyDefectSubstation: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get fullNameSubstation() {
    return `${this.object_type?.shortName} ${this.voltage_class?.name} кВ ${this.name}`
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

  @hasMany(() => TelemechanicsDevice)
  declare telemechanics_device: HasMany<typeof TelemechanicsDevice>

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

  @belongsTo(() => ObjectType)
  declare object_type: BelongsTo<typeof ObjectType>
}
