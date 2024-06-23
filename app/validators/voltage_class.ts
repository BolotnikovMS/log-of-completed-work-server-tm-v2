import vine from '@vinejs/vine'
import { text140 } from './fields_check.js'

export const voltageClassValidator = vine.compile(
  vine.object({
    name: text140,
  })
)
