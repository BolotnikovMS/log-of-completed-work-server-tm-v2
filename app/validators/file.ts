import vine from '@vinejs/vine'
import { arrFiles, typeFile } from './fields_check.js'

export const fileValidator = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' }),
    file: arrFiles,
    typeFile: typeFile,
  })
)
