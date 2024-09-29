import ModemsController from "#controllers/modems_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const modemsRoutes = router
  .group(() => {
    router.get('/', [ModemsController, 'index'])
    router.post('/', [ModemsController, 'store'])
    router.patch('/:id', [ModemsController, 'update'])
    router.delete('/:id', [ModemsController, 'destroy'])
  })
  .prefix('/modems')
  .use([middleware.auth()])
