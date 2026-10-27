import { dateText, text1000 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const createClosesDefect = vine.compile(
  vine.object({
    resolution: text1000,
    resolvedAt: dateText,
  })
)
