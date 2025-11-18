import { text30 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateGsmOperatorValidator = vine.compile(
  vine.object({
    name: text30.escape().optional()
  })
)
