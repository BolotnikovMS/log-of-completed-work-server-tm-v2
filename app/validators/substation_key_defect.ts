import vine from '@vinejs/vine'
import { numberOptional } from './fields_check.js'

export const substationKeyDefectValidator = vine.compile(
  vine.object({
    keyDefectSubstation: numberOptional
  })
)
