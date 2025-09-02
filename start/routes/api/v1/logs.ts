import LogsController from '#controllers/logs_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export const logRoutes = router
  .group(() => {
    router.get('/', [LogsController, 'index'])
    router.get('/:id', [LogsController, 'getLogInfo'])
  })
  .prefix('/logs')
  .use([middleware.auth()])
