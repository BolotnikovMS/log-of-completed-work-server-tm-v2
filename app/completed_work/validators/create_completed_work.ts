import { booleanCheck, dateText, text1000 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const createCompletedWorkValidator = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' }),
    description: text1000,
    note: text1000.optional().nullable(),
    workProducerId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'users', column: 'id' }),
    typeWorkId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'type_works', column: 'id' }),
    // dateCompletion: vine.date({
    //   formats: 'YYYY-MM-DD',
    // }),
    dateCompletion: dateText,
    inControl: booleanCheck.optional(),
  })
)
