import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const ChannelsController = () => import("#controllers/channels_controller")

export const channelRoutes = router
  .group(() => {
    router.get('/', [ChannelsController, 'index'])
    router.post('/', [ChannelsController, 'store'])
    router.patch('/:id', [ChannelsController, 'update'])
    router.delete('/:id', [ChannelsController, 'destroy'])
    router.get('/download-excel', [ChannelsController, 'downloadExcel'])
  })
  .prefix('/channels')
  .use([middleware.auth()])
