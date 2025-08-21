import { IQueryParams } from "#interfaces/query_params"
import { ELogActionType } from "../enums/index.js"
import { TLogAction } from "../types/index.js"

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
