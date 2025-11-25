import { noStrictNumberCheck } from '#shared/validators/fields_check'
import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const substationsQueryParamsSchema = {
  ...baseQueryParamsSchema,
  district: noStrictNumberCheck.optional(),
  channelType: noStrictNumberCheck.optional(),
  channelCategory: noStrictNumberCheck.optional(),
  objectType: noStrictNumberCheck.optional(),
  typeKp: noStrictNumberCheck.optional(),
  headController: noStrictNumberCheck.optional()
}

export const queryParamsSubstationsValidator = vine.compile(vine.object(substationsQueryParamsSchema))
