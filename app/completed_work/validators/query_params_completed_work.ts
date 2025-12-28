import { numberOrNumbersRule } from '#shared/rules/number_or_numbers'
import { dateText, noStrictNumberCheck } from '#shared/validators/fields_check'
import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const completedWorkQueryParamsSchema = {
  ...baseQueryParamsSchema,
  substation: noStrictNumberCheck.optional(),
  dateStart: dateText.optional(),
  dateEnd: dateText.optional(),
  executor: noStrictNumberCheck.optional(),
  typeWork: vine.any().optional().use(numberOrNumbersRule({})),
  inControl: vine.boolean().optional()
}

export const queryParamsCompletedWorkValidator = vine.compile(vine.object(completedWorkQueryParamsSchema))
