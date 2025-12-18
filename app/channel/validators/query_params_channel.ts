import { noStrictNumberCheck } from '#shared/validators/fields_check'
import { baseQueryParamsSchema } from '#shared/validators/index'
import vine from '@vinejs/vine'

const channelQueryParamsSchema = {
  ...baseQueryParamsSchema,
  substation: noStrictNumberCheck.optional(),
  channelType: noStrictNumberCheck.optional(),
  channelCategory: noStrictNumberCheck.optional(),
}

export const queryParamsChannelValidator = vine.compile(vine.object(channelQueryParamsSchema))
