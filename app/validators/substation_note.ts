import vine from '@vinejs/vine'
import { text1000Optional } from './fields_check.js'

export const substationNoteValidator = vine.compile(
  vine.object({
    note:text1000Optional
  })
)