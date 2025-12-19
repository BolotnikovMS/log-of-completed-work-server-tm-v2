import type { CreateLogRecord } from '#log/interfaces/index'
import type { LogAction } from '#log/types/index'
import { HttpContext, Request } from "@adonisjs/core/http"

export const logGeneration = (ctx: HttpContext, error?: any): CreateLogRecord => {
  const { request } = ctx
  let action: LogAction

  if (error) {
    action = determineActionFromError(error)
  } else {
    action = determineActionFromRequest(request)
  }

  console.log(error)

  return {
    action,
    statusCode: error.status,
    errorType: error.code || 'UNKNOWN_ERROR',
    errorMessage: error.message,
    url: request.url(),
    method: request.method(),
    ipAddress: request.ip(),
    userId: ctx.auth && ctx.auth.user ? ctx.auth.user.id : null,
    model: null,
    data: request.all()
  }
}

const determineActionFromRequest = (request: Request): LogAction => {
  const method = request.method().toUpperCase()
  const actionMap: Record<string, LogAction> = {
    'POST': 'create',
    'PUT': 'update',
    'PATCH': 'update',
    'DELETE': 'delete',
    'GET': 'view'
  }

  return actionMap[method] || 'error'
}

const determineActionFromError = (error: any): LogAction => {
  if (!error?.code) return 'error'

  const errorActionMap: Record<string, LogAction> = {
    'E_VALIDATION_ERROR': 'validation',
    'E_UNAUTHORIZED_ACCESS': 'auth',
    'E_AUTHORIZATION_FAILURE': 'auth',
    'E_INVALID_CREDENTIALS': 'auth'
  }

  return errorActionMap[error.code] || 'error'
}
