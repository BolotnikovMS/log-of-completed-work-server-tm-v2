import vine from '@vinejs/vine'
import { booleanCheckOptional, dateText, numberCheck, text1000, text700Optional } from './fields_check.js'

export const completedWorkValidator = vine.compile(
  vine.object({
    substationId: vine.number(),
    description: text1000,
    note: text700Optional,
    workProducerId: numberCheck,
    typeWorkId: numberCheck,
    // dateCompletion: vine.date({
    //   formats: 'DD.MM.YYYY',
    // }),
    dateCompletion: dateText,
    inControl: booleanCheckOptional,
  })
)
