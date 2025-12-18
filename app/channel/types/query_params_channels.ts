import type { queryParamsChannelValidator } from '#channel/validators/query_params_channel'
import type { Infer } from '@vinejs/vine/types'

export type QueryParamsChannel = Infer<typeof queryParamsChannelValidator>
