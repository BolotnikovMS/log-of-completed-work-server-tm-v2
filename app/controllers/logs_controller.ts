import LogShortDto from '#domains/logs/dtos/log_short'
import { LogService } from '#services/log_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogsController {
  async index({ request, response }: HttpContext) {
    const data = await LogService.getLogs(request)
    const logs = LogShortDto.fromPaginator(data)

    return response.status(200).json(logs)
  }

  async show({ params }: HttpContext) {
    //  Получение полной инф-ии по конкретному событию
  }

  async destroy({ params }: HttpContext) { }
}
