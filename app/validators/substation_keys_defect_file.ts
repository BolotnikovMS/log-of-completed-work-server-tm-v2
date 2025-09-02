import vine from '@vinejs/vine'
import { numberCheck } from './fields_check.js'

export const csvDataSubstationKeyValidator = vine.compile(
  vine.object({
    id: numberCheck.exists({ table: 'substations', column: 'id' }),
    keyDefectSubstation: vine.number({ strict: true }).positive().withoutDecimals().min(1).nullable()
  })
)
