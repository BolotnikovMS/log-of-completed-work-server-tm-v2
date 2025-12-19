import type { queryParamsLogValidator } from '#log/validators/query_params_log'
import type { Infer } from '@vinejs/vine/types'

export type QueryParamsLog = Infer<typeof queryParamsLogValidator>
