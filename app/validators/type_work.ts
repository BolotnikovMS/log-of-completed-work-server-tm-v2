import vine from '@vinejs/vine'
import { text50 } from './fields_check.js'

export const typeWorkValidator = vine.compile(
  vine.object({
    name: text50.escape(),
  })
)
