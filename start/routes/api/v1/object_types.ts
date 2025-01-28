import ObjectTypesController from "#controllers/object_types_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const objectTypesRoutes = router
  .group(() => {
    router.get('/', [ObjectTypesController, 'index'])
    router.post('/', [ObjectTypesController, 'store'])
    router.patch('/:id', [ObjectTypesController, 'update'])
    router.delete('/:id', [ObjectTypesController, 'destroy'])
  })
  .prefix('/object-types')
  .use([middleware.auth()])
