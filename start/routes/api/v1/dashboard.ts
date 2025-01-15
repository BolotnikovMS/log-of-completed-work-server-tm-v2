import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const DashboardController = () => import("#controllers/dashboard_controller")

export const dashboardRoutes = router.group(() => {
  router.get('/statistics-type-kp', [DashboardController, 'statisticsByTypeKp'])
  router.get('/statistics-completed-works-years', [DashboardController, 'statisticsCompletedWorksYears'])
})
  .prefix('/dashboards')
  .use([middleware.auth()])
