import type { LogActionType } from '#log/enums/index'
import type { BaseQueryParams } from '#shared/interfaces/query_params'

export interface QueryParamsLog extends BaseQueryParams {
  action?: LogActionType
}
