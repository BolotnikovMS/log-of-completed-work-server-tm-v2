import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'

import Substation from '#models/substation'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import string from '@poppinss/utils/string'
import { DateTime } from 'luxon'
import User from './user.js'

export default class CompletedWork extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare substationId: number

  @column()
  declare workProducerId: number

  @column()
  declare description: string

  @column()
  declare note: string | null

  // @column({
  //   prepare: (value: Date) => {
  //     console.log(value)
  //     return DateTime.expandFormat(value.toLocaleDateString())
  //   },
  // })
  // declare dateCompletion: DateTime
  @column()
  declare dateCompletion: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get shortText() {
    return string.truncate(this.description, 90, { completeWords: true })
  }

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'workProducerId',
  })
  declare work_producer: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>
}
