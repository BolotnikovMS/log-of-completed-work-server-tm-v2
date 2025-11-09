import HeadsController from "#head_controller/controllers/heads_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const headControllersRoutes = router
  .group(() => {
    router.get('/', [HeadsController, 'index'])
    router.post('/', [HeadsController, 'store'])
    router.patch('/:id', [HeadsController, 'update'])
    router.delete('/:id', [HeadsController, 'destroy'])
  })
  .prefix('/head-controllers')
  .use([middleware.auth()])
