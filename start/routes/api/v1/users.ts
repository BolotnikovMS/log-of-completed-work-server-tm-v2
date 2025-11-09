import { middleware } from "#start/kernel"
import UsersController from "#user/controllers/users_controller"
import router from "@adonisjs/core/services/router"

export const usersRoutes = router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.get('/short', [UsersController, 'getShortUsers'])
    router.get('/roles', [UsersController, 'getRoles'])
    router.post('/create-account', [UsersController, 'createUserAccount'])
    router.get('/:id', [UsersController, 'getUser'])
    router.patch('/reset-password/:id', [UsersController, 'resetUserPassword'])
    router.patch('/block-user-account/:id', [UsersController, 'blockUserAccount'])
    router.patch('/change-role/:id', [UsersController, 'changeRole'])
  })
  .prefix('/users')
  .use([middleware.auth()])
