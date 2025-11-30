import { booleanCheck, dateText, noStrictNumberCheck } from '#shared/validators/fields_check'
import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const completedWorkQueryParamsSchema = {
  ...baseQueryParamsSchema,
  substation: noStrictNumberCheck.optional(),
  dateStart: dateText.optional(),
  dateEnd: dateText.optional(),
  executor: noStrictNumberCheck.optional(),
  typeWork: vine.array(noStrictNumberCheck).optional(),
  inControl: booleanCheck.optional()
}

export const queryParamsCompletedWorkValidator = vine.compile(vine.object(completedWorkQueryParamsSchema))
