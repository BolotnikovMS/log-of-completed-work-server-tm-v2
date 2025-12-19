import { middleware } from "#start/kernel"
import AuthController from "#user/controllers/auth_controller"
import router from "@adonisjs/core/services/router"

export const authRoutes = router.group(() => {
  router.post('/login', [AuthController, 'login'])
  router.get('/logout', [AuthController, 'logout'])
  router.get('/profile', [AuthController, 'profile']).use([middleware.auth()])
  router.patch('/change-password', [AuthController, 'changePassword']).use([middleware.auth()])
})
