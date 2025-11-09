import DistrictsController from '#district/controllers/districts_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export const districtsRoutes = router
  .group(() => {
    router.get('/', [DistrictsController, 'index'])
    router.post('/', [DistrictsController, 'store'])
    router.get('/:id', [DistrictsController, 'getDistrict'])
    router.get('/:id/substations', [DistrictsController, 'getSubstations'])
    router.patch('/:id', [DistrictsController, 'update'])
    router.delete('/:id', [DistrictsController, 'destroy'])
  })
  .prefix('/districts')
  .use([middleware.auth()])
