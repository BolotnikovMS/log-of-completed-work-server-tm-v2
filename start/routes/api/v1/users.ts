import UsersController from "#controllers/users_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const usersRoutes = router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.get('/roles', [UsersController, 'getRoles'])
    router.post('/create-account', [UsersController, 'createUserAccount'])
    router.patch('/reset-password/:id', [UsersController, 'resetUserPassword'])
    router.patch('/block-user-account/:id', [UsersController, 'blockUserAccount'])
  })
  .prefix('/users')
  .use([middleware.auth()])
