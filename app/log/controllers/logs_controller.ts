import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import { LogInfoDto, LogShortDto } from '#log/dtos/index'
import { LogService } from '#log/services/log_service'
import LogPolicy from '#policies/log_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogsController {
  async index({ request, response, bouncer }: HttpContext) {
    if (await bouncer.with(LogPolicy).denies('viewLog')) {
      return response.status(403).json({ message: accessErrorMessages.view })
    }

    const data = await LogService.getLogs(request)
    const logs = LogShortDto.fromPaginator(data)

    return response.status(200).json(logs)
  }

  async getLogInfo({ response, params, bouncer }: HttpContext) {
    if (await bouncer.with(LogPolicy).denies('viewLog')) {
      return response.status(403).json({ message: accessErrorMessages.view })
    }

    const logParams = params as IParams
    const data = await LogService.getLogInfoById(logParams)
    const log = new LogInfoDto(data)

    return response.status(200).json(log)
  }
}
