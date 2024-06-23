import VoltageClassesController from "#controllers/voltage_classes_controller"
import { middleware } from '#start/kernel'
import router from "@adonisjs/core/services/router"

export const voltageClassesRoutes = router
  .group(() => {
    router.get('/', [VoltageClassesController, 'index'])
    router.post('/', [VoltageClassesController, 'store'])
    router.patch('/:id', [VoltageClassesController, 'update'])
    router.delete('/:id', [VoltageClassesController, 'destroy'])
  })
  .prefix('/voltage-classes')
  .use([middleware.auth()])
