import DashboardService from '#services/dashboard_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async statisticsByTypeKp({ response }: HttpContext) {
    const typesKp = await DashboardService.getSubstationsTypeKp()

    return response.status(200).json(typesKp)
  }
}
