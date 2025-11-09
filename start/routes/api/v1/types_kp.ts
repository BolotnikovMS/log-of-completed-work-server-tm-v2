import { middleware } from '#start/kernel'
import TypesKpsController from '#type_kp/controllers/types_kps_controller'
import router from '@adonisjs/core/services/router'

export const typesKpRoutes = router
  .group(() => {
    router.get('/', [TypesKpsController, 'index'])
    router.post('/', [TypesKpsController, 'store'])
    router.patch('/:id', [TypesKpsController, 'update'])
    router.delete('/:id', [TypesKpsController, 'destroy'])
  })
  .prefix('/types-kp')
  .use([middleware.auth()])
