import vine from '@vinejs/vine'
import { text30 } from './fields_check.js'

export const typeKpValidator = vine.compile(
  vine.object({
    name: text30.escape(),
  })
)
