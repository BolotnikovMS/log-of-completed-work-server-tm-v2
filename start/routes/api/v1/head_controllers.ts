import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const HeadsController = () => import("#controllers/heads_controller")

export const headControllersRoutes = router
  .group(() => {
    router.get('/', [HeadsController, 'index'])
    router.post('/', [HeadsController, 'store'])
    router.patch('/:id', [HeadsController, 'update'])
    router.delete('/:id', [HeadsController, 'destroy'])
  })
  .prefix('/head-controllers')
  .use([middleware.auth()])
