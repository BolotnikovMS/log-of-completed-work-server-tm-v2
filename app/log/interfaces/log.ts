import type { LogAction } from '#log/types/index'

export interface CreateLogRecord {
  userId: number | null
  url?: string
  method?: string
  statusCode?: number | null
  action: LogAction,
  errorType?: string
  errorMessage?: string
  model?: string | null
  data: any
  changes?: any
  ipAddress?: string
}
