import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const SubstationsController = () => import("#controllers/substations_controller")

export const substationsRoutes = router
  .group(() => {
    router.get('/', [SubstationsController, 'index'])
    router.post('/', [SubstationsController, 'store'])
    router.get('/download-substations-excel', [SubstationsController, 'downloadSubstationsExcel'])
    router.get('/:id', [SubstationsController, 'getSubstation'])
    router.patch('/:id', [SubstationsController, 'update'])
    router.patch('/:id/note', [SubstationsController, 'updateNote'])
    router.delete('/:id', [SubstationsController, 'destroy'])
  })
  .prefix('/substations')
  .use([middleware.auth()])
