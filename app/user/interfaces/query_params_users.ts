import type { BaseQueryParams } from '#shared/interfaces/query_params'

export interface UserQueryParams extends BaseQueryParams {
  active?: boolean
  cleanUser?: boolean
}
