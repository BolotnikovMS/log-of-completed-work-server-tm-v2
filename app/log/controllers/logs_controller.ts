import { LogInfoDto, LogShortDto } from '#log/dtos/index'
import type { QueryParamsLog } from '#log/interfaces/index'
import { LogService } from '#log/services/log_service'
import { queryParamsLogValidator } from '#log/validators/query_params_log'
import LogPolicy from '#policies/log_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { Params } from '#shared/interfaces/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogsController {
  async index({ request, response, bouncer }: HttpContext) {
    if (await bouncer.with(LogPolicy).denies('viewLog')) {
      return response.status(403).json({ message: accessErrorMessages.view })
    }

    const filters = request.qs() as QueryParamsLog
    const validatedFilters = await queryParamsLogValidator.validate(filters)
    const data = await LogService.getLogs(validatedFilters)
    const logs = LogShortDto.fromPaginator(data)

    return response.status(200).json(logs)
  }

  async getLogInfo({ response, params, bouncer }: HttpContext) {
    if (await bouncer.with(LogPolicy).denies('viewLog')) {
      return response.status(403).json({ message: accessErrorMessages.view })
    }

    const logParams = params as Params
    const data = await LogService.findById(logParams.id)
    const log = new LogInfoDto(data)

    return response.status(200).json(log)
  }
}
