import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const TypesKpsController = () => import('#controllers/types_kps_controller')

export const typesKpRoutes = router
  .group(() => {
    router.get('/', [TypesKpsController, 'index'])
    router.post('/', [TypesKpsController, 'store'])
    router.patch('/:id', [TypesKpsController, 'update'])
    router.delete('/:id', [TypesKpsController, 'destroy'])
  })
  .prefix('/types-kp')
  .use([middleware.auth()])
