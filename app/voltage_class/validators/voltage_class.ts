import { text30 } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const voltageClassValidator = vine.compile(
  vine.object({
    name: text30,
  })
)
