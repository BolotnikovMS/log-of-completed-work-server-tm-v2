import { text1000 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const substationNoteValidator = vine.compile(
  vine.object({
    note: text1000.optional().nullable()
  })
)
