import { numberCheck } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const csvDataSubstationKeyValidator = vine.compile(
  vine.object({
    id: numberCheck.exists({ table: 'substations', column: 'id' }),
    keyDefectSubstation: vine.number({ strict: true }).positive().withoutDecimals().min(1).nullable()
  })
)
