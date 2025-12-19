import { text50 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateTypeWorkValidator = vine.compile(
  vine.object({
    name: text50.escape().optional()
  })
)
