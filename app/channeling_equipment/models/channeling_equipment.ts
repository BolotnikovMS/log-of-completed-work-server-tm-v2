import { Channel } from '#channel/index'
import { ChannelType } from '#channel_type/index'
import { replacementEscapeSymbols } from '#shared/helpers/index'
import { User } from '#user/index'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class ChannelingEquipment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare channelTypeId: number

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>

  @belongsTo(() => ChannelType)
  declare channel_type: BelongsTo<typeof ChannelType>

  @hasMany(() => Channel)
  declare channels: HasMany<typeof Channel>
}
