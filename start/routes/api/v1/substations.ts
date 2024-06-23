import SubstationsController from "#controllers/substations_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const substationsRoutes = router
  .group(() => {
    router.get('/', [SubstationsController, 'index'])
    router.post('/', [SubstationsController, 'store'])
    router.get('/:id', [SubstationsController, 'getSubstation'])
    router.patch('/:id', [SubstationsController, 'update'])
    router.delete('/:id', [SubstationsController, 'destroy'])
  })
  .prefix('/substations')
  .use([middleware.auth()])
