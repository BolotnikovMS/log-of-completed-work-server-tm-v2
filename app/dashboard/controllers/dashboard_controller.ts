import DashboardService from '#dashboard/services/dashboard_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async statisticsByTypeKp({ response }: HttpContext) {
    const typesKp = await DashboardService.getSubstationsTypeKp()

    return response.status(200).json(typesKp)
  }
  async statisticsCompletedWorksYears({ response }: HttpContext) {
    const statisticCompletedWorks = await DashboardService.getCompletedWorksYear()

    return response.status(200).json(statisticCompletedWorks)
  }
}
