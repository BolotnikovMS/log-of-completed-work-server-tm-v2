import { text30 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateVoltageClassValidator = vine.compile(
  vine.object({
    name: text30.optional()
  })
)
