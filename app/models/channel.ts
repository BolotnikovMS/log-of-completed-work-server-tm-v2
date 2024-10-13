import { replacementEscapeSymbols } from '#helpers/replacement_escape_symbols'
import ChannelCategory from '#models/channel_category'
import ChannelType from '#models/channel_type'
import ChannelingEquipment from '#models/channeling_equipment'
import GsmOperator from '#models/gsm_operator'
import Substation from '#models/substation'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Channel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare substationId: number

  @column()
  declare channelCategoryId: number

  @column()
  declare channelTypeId: number

  @column()
  declare channelEquipmentId: number | null

  @column()
  declare gsmId: number | null

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare ipAddress: string | null

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare note: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>

  @belongsTo(() => ChannelCategory)
  declare channel_category: BelongsTo<typeof ChannelCategory>

  @belongsTo(() => ChannelType)
  declare channel_type: BelongsTo<typeof ChannelType>

  @belongsTo(() => ChannelingEquipment, {
    foreignKey: 'channelEquipmentId'
  })
  declare channel_equipment: BelongsTo<typeof ChannelingEquipment>

  @belongsTo(() => GsmOperator, {
    foreignKey: 'gsmId'
  })
  declare gsm_operator: BelongsTo<typeof GsmOperator>
}
