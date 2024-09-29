import vine from '@vinejs/vine'
import { text180 } from './fields_check.js'

export const modemValidator = vine.compile(
  vine.object({
    name: text180,
  })
)
