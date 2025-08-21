import { IQueryParams } from "#interfaces/query_params"
import { ELogActionType, ELogStatus } from "../enums/index.js"

export interface INewLogRecord {
  userId: number
  actionType: ELogActionType
  entityType: string
  entityId: number | null
  userIpAddress: string
  additionalData: string | null
  status: ELogStatus
  errorMessage: string | null
}

export interface IQueryParamsLog extends IQueryParams {
  action: ELogActionType
  status: ELogStatus
}
