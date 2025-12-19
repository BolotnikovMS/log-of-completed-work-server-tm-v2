import type { queryParamsUsersValidator } from '#user/validators/query_params_user'
import type { Infer } from '@vinejs/vine/types'

export type QueryParamsUser = Infer<typeof queryParamsUsersValidator>
