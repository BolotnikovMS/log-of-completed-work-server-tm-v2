import type { DefectCategory, DefectStatus } from '#defect/types/defect_category'
import { replacementEscapeSymbols } from '#shared/helpers/replacement_escape_symbols'
import Substation from '#substation/models/substation'
import User from '#user/models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Defect extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare substationId: number

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare title: string

  @column({
    consume: (value: string): string | null => replacementEscapeSymbols(value),
  })
  declare description: string

  @column()
  declare category: DefectCategory

  @column()
  declare status: DefectStatus

  @column()
  declare userIdResolved: number | null

  @column()
  declare resolution: string | null

  @column.dateTime()
  declare resolvedAt: DateTime | null

  @column.dateTime({
    autoCreate: true,
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
  })
  declare updatedAt: DateTime

  @belongsTo(() => Substation)
  declare substation: BelongsTo<typeof Substation>

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'userIdResolved',
    localKey: 'id'
  })
  declare authorResolved: BelongsTo<typeof User>
}
