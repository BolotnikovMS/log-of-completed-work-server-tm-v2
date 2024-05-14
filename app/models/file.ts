import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'

import Substation from '#models/substation'
import app from '@adonisjs/core/services/app'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

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

  @computed()
  get urlDownloadFile() {
    return app.tmpPath(this.filePath)
  }

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>
}
