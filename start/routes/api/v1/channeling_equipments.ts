import ChannelingEquipmentsController from "#channeling_equipment/controllers/channeling_equipments_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const channelingEquipmentsRoutes = router
  .group(() => {
    router.get('/', [ChannelingEquipmentsController, 'index'])
    router.get('/:id', [ChannelingEquipmentsController, 'getEquipment'])
    router.post('/', [ChannelingEquipmentsController, 'store'])
    router.patch('/:id', [ChannelingEquipmentsController, 'update'])
    router.delete('/:id', [ChannelingEquipmentsController, 'destroy'])
  })
  .prefix('/channeling-equipments')
  .use([middleware.auth()])
