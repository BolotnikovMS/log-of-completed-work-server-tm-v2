import { middleware } from '#start/kernel'
import TelemechanicsDevicesController from '#telemechanic_device/controllers/telemechanics_devices_controller'
import router from '@adonisjs/core/services/router'

export const telemechanicsDevicesRoutes = router
  .group(() => {
    router.get('/', [TelemechanicsDevicesController, 'index'])
    router.get('/:id', [TelemechanicsDevicesController, 'getTelemechanicsDeviceById'])
    router.get('/:id/info', [TelemechanicsDevicesController, 'getTelemechanicsDeviceInfoById'])
    router.post('/', [TelemechanicsDevicesController, 'store'])
    router.patch('/:id', [TelemechanicsDevicesController, 'update'])
    router.delete('/:id', [TelemechanicsDevicesController, 'destroy'])
  })
  .prefix('/telemechanics-devices')
  .use([middleware.auth()])
