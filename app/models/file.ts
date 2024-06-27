import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

import Substation from '#models/substation'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from '#models/user'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare substationId: number

  @column()
  declare filePath: string

  @column()
  declare clientName: string

  @column()
  declare typeFile: string

  @column()
  declare extname: string

  @column()
  declare size: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>
}
