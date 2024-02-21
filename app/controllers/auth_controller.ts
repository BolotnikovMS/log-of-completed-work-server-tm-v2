import User from '#models/user'
import { loginValidator } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ response, request, auth }: HttpContext) {
    try {
      const validatedData = await request.validateUsing(loginValidator)
      console.log(validatedData)
      const user = await User.query()
        .where('username', '=', validatedData.username)
        .where('active', '=', true)
        .firstOrFail()

      if (!(await hash.verify(user.password, validatedData.password))) {
        return response.unauthorized('Invalid credentials')
      }
    } catch (error) {
      console.log(error)
    }
    return response.status(200).json({ message: 'Success!' })
  }

  async logout({}: HttpContext) {}

  async register({}: HttpContext) {}
}
