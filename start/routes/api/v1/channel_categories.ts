import ChannelCategoriesController from "#channel_category/controllers/channel_categories_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const channelCategoriesRoutes = router
  .group(() => {
    router.get('/', [ChannelCategoriesController, 'index'])
    router.get('/:id', [ChannelCategoriesController, 'getChannelCategory'])
    router.post('/', [ChannelCategoriesController, 'store'])
    router.patch('/:id', [ChannelCategoriesController, 'update'])
    router.delete('/:id', [ChannelCategoriesController, 'destroy'])
  })
  .prefix('/channel-categories')
  .use([middleware.auth()])
