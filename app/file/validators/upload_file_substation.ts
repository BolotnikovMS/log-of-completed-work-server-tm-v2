import { arrFiles, typeFile } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const uploadFileSubstationValidator = vine.compile(
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
