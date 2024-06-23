import vine from '@vinejs/vine'
import { arrFiles, numberCheck, typeFile } from './fields_check.js'

export const fileValidator = vine.compile(
  vine.object({
    substationId: numberCheck,
    file: arrFiles,
    typeFile: typeFile,
  })
)
