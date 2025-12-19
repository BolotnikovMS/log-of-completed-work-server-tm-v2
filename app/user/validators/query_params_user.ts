import { booleanCheck } from '#shared/validators/fields_check'
import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const usersQueryParamsSchema = {
  ...baseQueryParamsSchema,
  active: booleanCheck.optional(),
  cleanUser: booleanCheck.optional()
}

export const queryParamsUsersValidator = vine.compile(vine.object(usersQueryParamsSchema))
