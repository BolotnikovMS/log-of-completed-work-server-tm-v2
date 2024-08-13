import CompletedWorksController from "#controllers/completed_works_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const completedWorksRoutes = router
  .group(() => {
    router.get('/', [CompletedWorksController, 'index'])
    router.post('/', [CompletedWorksController, 'store'])
    router.patch('/:id', [CompletedWorksController, 'update'])
    router.delete('/:id', [CompletedWorksController, 'destroy'])
    router.get('/download-excel', [CompletedWorksController, 'downloadExcel'])
  })
  .prefix('/completed-works')
  .use([middleware.auth()])
