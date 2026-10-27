import DefectsController from '#defect/controllers/defects_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export const defectsRoutes = router
  .group(() => {
    router.get('/', [DefectsController, 'getDefectList'])
    router.get('/:id', [DefectsController, 'getDefect'])
    router.get('/:id/info', [DefectsController, 'getDefectInfo'])
    router.post('/', [DefectsController, 'storeDefect'])
    router.patch('/:id/closes', [DefectsController, 'storeClosesDefect'])
    router.patch('/:id', [DefectsController, 'updateDefect'])
    router.delete('/:id', [DefectsController, 'destroy'])
  })
  .prefix('/defects')
  .use([middleware.auth()])
