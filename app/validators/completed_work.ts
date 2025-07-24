import vine from '@vinejs/vine'
import { booleanCheck, dateText, text1000 } from './fields_check.js'

export const completedWorkValidator = vine.compile(
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
    //   formats: 'DD.MM.YYYY',
    // }),
    dateCompletion: dateText,
    inControl: booleanCheck.optional(),
  })
)
