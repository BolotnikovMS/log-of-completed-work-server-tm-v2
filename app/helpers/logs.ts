import { INewLogRecord } from "#domains/logs/interfaces/index"
import { TLogAction } from "#domains/logs/types/index"
import { HttpContext, Request } from "@adonisjs/core/http"

export const logGeneration = (ctx: HttpContext, error?: any): INewLogRecord => {
  const { request } = ctx
  let action: TLogAction

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

const determineActionFromRequest = (request: Request): TLogAction => {
  const method = request.method().toUpperCase()
  const actionMap: Record<string, TLogAction> = {
    'POST': 'create',
    'PUT': 'update',
    'PATCH': 'update',
    'DELETE': 'delete',
    'GET': 'view'
  }

  return actionMap[method] || 'error'
}

const determineActionFromError = (error: any): TLogAction => {
  if (!error?.code) return 'error'

  const errorActionMap: Record<string, TLogAction> = {
    'E_VALIDATION_ERROR': 'validation',
    'E_UNAUTHORIZED_ACCESS': 'auth',
    'E_AUTHORIZATION_FAILURE': 'auth',
    'E_INVALID_CREDENTIALS': 'auth'
  }

  return errorActionMap[error.code] || 'error'
}
