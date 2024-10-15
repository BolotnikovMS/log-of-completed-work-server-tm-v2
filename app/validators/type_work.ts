import vine from '@vinejs/vine'
import { text240 } from './fields_check.js'

export const typeWorkValidator = vine.compile(
  vine.object({
    name: text240,
  })
)