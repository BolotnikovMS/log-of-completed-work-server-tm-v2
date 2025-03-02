import SubstationsController from "#controllers/substations_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const substationsRoutes = router
  .group(() => {
    router.get('/', [SubstationsController, 'index'])
    router.post('/', [SubstationsController, 'store'])
    router.get('/download-substations-excel', [SubstationsController, 'downloadSubstationsExcel'])
    router.get('/:id/info', [SubstationsController, 'getSubstationInfo'])
    router.get('/:id', [SubstationsController, 'getSubstation'])
    router.patch('/:id', [SubstationsController, 'update'])
    router.patch('/:id/note', [SubstationsController, 'updateNote'])
    router.delete('/:id', [SubstationsController, 'destroy'])
  })
  .prefix('/substations')
  .use([middleware.auth()])
