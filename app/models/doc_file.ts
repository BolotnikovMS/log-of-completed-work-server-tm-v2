import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class DocFile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare folderId: number | null

  @column()
  declare filePath: string

  @column()
  declare clientName: string

  @column()
  declare extname: string

  @column()
  declare typeFile: string

  @column()
  declare size: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>
}
// public originalName: string +
// public storagePath: string  // "uploads/user_id/folder_id/filename" +
// public mimeType: string +
// public size: number +
// public userId: number +
// @column({ isForeignKey: true })
// public folderId: number +
