import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'
import CompletedWork from './completed_work.js'
import District from './district.js'
import VoltageClass from './voltage_class.js'

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
  declare mainChannelId: number

  @column()
  declare backupChannelId: number | null

  @column()
  declare additionalChannelId: number | null

  @column()
  declare gsmId: number | null

  @column()
  declare name: string

  @column()
  declare mainChannelIp: string

  @column()
  declare backupChannelIp: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get numberCompletedWorks() {
    return this.works?.length
  }

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
}
