import { booleanCheck, dateText, text1000 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateCompletedWorkValidator = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' })
      .optional(),
    description: text1000.optional(),
    note: text1000.optional().nullable(),
    workProducerId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'users', column: 'id' })
      .optional(),
    typeWorkId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'type_works', column: 'id' })
      .optional(),
    // dateCompletion: vine.date({
    //   formats: 'YYYY-MM-DD',
    // })
    // .optional(),
    dateCompletion: dateText.optional(),
    inControl: booleanCheck.optional(),
  })
)
