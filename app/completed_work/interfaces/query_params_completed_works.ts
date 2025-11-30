import type { BaseQueryParams } from '#shared/interfaces/query_params'

export interface CompletedWorkParams extends BaseQueryParams {
  substation?: number
  dateStart?: string
  dateEnd?: string
  executor?: number
  typeWork?: number[]
  inControl?: boolean
}
