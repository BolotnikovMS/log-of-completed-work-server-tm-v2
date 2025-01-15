import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const UsersController = () => import("#controllers/users_controller")

export const usersRoutes = router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.get('/roles', [UsersController, 'getRoles'])
    router.post('/create-account', [UsersController, 'createUserAccount'])
    router.patch('/reset-password/:id', [UsersController, 'resetUserPassword'])
    router.patch('/block-user-account/:id', [UsersController, 'blockUserAccount'])
    router.patch('/change-role/:id', [UsersController, 'changeRole'])
  })
  .prefix('/users')
  .use([middleware.auth()])
