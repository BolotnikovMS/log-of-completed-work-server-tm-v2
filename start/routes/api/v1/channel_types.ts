import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const ChannelTypesController = () => import("#controllers/channel_types_controller")

export const channelTypesRoutes = router
  .group(() => {
    router.get('/', [ChannelTypesController, 'index'])
    router.post('/', [ChannelTypesController, 'store'])
    router.patch('/:id', [ChannelTypesController, 'update'])
    router.delete('/:id', [ChannelTypesController, 'destroy'])
  })
  .prefix('/channel-types')
  .use([middleware.auth()])
