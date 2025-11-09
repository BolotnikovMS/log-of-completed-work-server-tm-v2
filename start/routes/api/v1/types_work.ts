import { middleware } from "#start/kernel"
import TypesWorksController from "#type_work/controllers/types_works_controller"
import router from "@adonisjs/core/services/router"

export const typesWork = router
  .group(() => {
    router.get('/', [TypesWorksController, 'index'])
    router.post('/', [TypesWorksController, 'store'])
    router.patch('/:id', [TypesWorksController, 'update'])
    router.delete('/:id', [TypesWorksController, 'destroy'])
  })
  .prefix('/types-work')
  .use([middleware.auth()])
