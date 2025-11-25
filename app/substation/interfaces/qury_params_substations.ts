import type { BaseQueryParams } from '#shared/interfaces/query_params'

export interface SubstationQueryParams extends BaseQueryParams {
  district?: number
  channelType?: number
  channelCategory?: number
  objectType?: number
  typeKp?: number
  headController?: number
}
