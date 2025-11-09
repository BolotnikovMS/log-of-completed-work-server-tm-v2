import GsmOperatorsController from "#gsm_operator/controllers/gsm_operators_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const gsmOperatorsRoutes = router
  .group(() => {
    router.get('/', [GsmOperatorsController, 'index'])
    router.get('/:id', [GsmOperatorsController, 'getGsmOperator'])
    router.post('/', [GsmOperatorsController, 'store'])
    router.patch('/:id', [GsmOperatorsController, 'update'])
    router.delete('/:id', [GsmOperatorsController, 'destroy'])
  })
  .prefix('/gsm-operators')
  .use([middleware.auth()])
