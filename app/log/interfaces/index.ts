import { ELogActionType } from '#log/enums/index'
import { TLogAction } from '#log/types/index'
import { IQueryParams } from '#shared/interfaces/query_params'

export interface INewLogRecord {
  userId: number | null
  url?: string
  method?: string
  statusCode?: number | null
  action: TLogAction,
  errorType?: string
  errorMessage?: string
  model?: string | null
  data: any
  changes?: any
  ipAddress?: string
}

export interface IQueryParamsLog extends IQueryParams {
  action: ELogActionType
}
