import TelemechanicsDevicesController from "#controllers/telemechanics_devices_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const telemechanicsDevicesRoutes = router
  .group(() => {
    router.get('/:id', [TelemechanicsDevicesController, 'getTelemechanicsDeviceById'])
    router.post('/', [TelemechanicsDevicesController, 'store'])
    router.patch('/:id', [TelemechanicsDevicesController, 'update'])
    router.delete('/:id', [TelemechanicsDevicesController, 'destroy'])
  })
  .prefix('/telemechanics-devices')
  .use([middleware.auth()])
