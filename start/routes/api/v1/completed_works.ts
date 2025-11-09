import CompletedWorksController from "#completed_work/controllers/completed_works_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const completedWorksRoutes = router
  .group(() => {
    router.get('/', [CompletedWorksController, 'index'])
    router.get('/download-excel', [CompletedWorksController, 'downloadExcel'])
    router.get('/:id', [CompletedWorksController, 'getCompletedWork'])
    router.get('/:id/info', [CompletedWorksController, 'getCompletedWorkInfo'])
    router.post('/', [CompletedWorksController, 'store'])
    router.patch('/:id', [CompletedWorksController, 'update'])
    router.delete('/:id', [CompletedWorksController, 'destroy'])
  })
  .prefix('/completed-works')
  .use([middleware.auth()])
