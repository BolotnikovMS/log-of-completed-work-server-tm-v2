import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const ChannelingEquipmentsController = () =>import("#controllers/channeling_equipments_controller")

export const channelingEquipmentsRoutes = router
  .group(() => {
    router.get('/', [ChannelingEquipmentsController, 'index'])
    router.post('/', [ChannelingEquipmentsController, 'store'])
    router.patch('/:id', [ChannelingEquipmentsController, 'update'])
    router.delete('/:id', [ChannelingEquipmentsController, 'destroy'])
  })
  .prefix('/channeling-equipments')
  .use([middleware.auth()])
