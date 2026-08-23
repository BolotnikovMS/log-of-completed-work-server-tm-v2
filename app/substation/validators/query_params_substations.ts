import { numberOrNumbersRule } from '#shared/rules/number_or_numbers'
import { noStrictNumberCheck } from '#shared/validators/fields_check'
import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const substationsQueryParamsSchema = {
  ...baseQueryParamsSchema,
  district: noStrictNumberCheck.optional(),
  channelType: noStrictNumberCheck.optional(),
  channelCategory: noStrictNumberCheck.optional(),
  objectType: noStrictNumberCheck.optional(),
  // typeKp: noStrictNumberCheck.optional(),
  // headController: noStrictNumberCheck.optional()
  typeKp: vine.any().optional().use(numberOrNumbersRule({})),
  headController: vine.any().optional().use(numberOrNumbersRule({}))
}

export const queryParamsSubstationsValidator = vine.compile(vine.object(substationsQueryParamsSchema))
