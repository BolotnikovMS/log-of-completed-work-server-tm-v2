import type { queryParamsSubstationsValidator } from '#substation/validators/query_params_substations'
import type { Infer } from '@vinejs/vine/types'

export type QueryParamsSubstation = Infer<typeof queryParamsSubstationsValidator>
