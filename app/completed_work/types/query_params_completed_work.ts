import type { queryParamsCompletedWorkValidator } from '#completed_work/validators/query_params_completed_work'
import type { Infer } from '@vinejs/vine/types'

export type QueryParamsCompletedWork = Infer<typeof queryParamsCompletedWorkValidator>
