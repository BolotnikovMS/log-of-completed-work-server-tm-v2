import vine from '@vinejs/vine'
import { text1000 } from './fields_check.js'

export const substationNoteValidator = vine.compile(
  vine.object({
    note:text1000.optional().nullable()
  })
)
