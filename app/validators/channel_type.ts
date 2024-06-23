import vine from '@vinejs/vine'
import { text240 } from './fields_check.js'

export const chanelTypeValidator = vine.compile(
  vine.object({
    name: text240,
  })
)
