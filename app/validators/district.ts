import vine from '@vinejs/vine'
import { text50 } from './fields_check.js'

export const districtValidator = vine.compile(
  vine.object({
    name: text50.escape(),
    shortName: text50.escape(),
  })
)
