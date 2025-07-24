import vine from '@vinejs/vine'
import { text30 } from './fields_check.js'

export const voltageClassValidator = vine.compile(
  vine.object({
    name: text30,
  })
)
