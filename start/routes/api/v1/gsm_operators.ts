import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const GsmOperatorsController = () => import("#controllers/gsm_operators_controller")

export const gsmOperatorsRoutes = router
  .group(() => {
    router.get('/', [GsmOperatorsController, 'index'])
    router.post('/', [GsmOperatorsController, 'store'])
    router.patch('/:id', [GsmOperatorsController, 'update'])
    router.delete('/:id', [GsmOperatorsController, 'destroy'])
  })
  .prefix('/gsm-operators')
  .use([middleware.auth()])
