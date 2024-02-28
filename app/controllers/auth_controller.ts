import User from '#models/user'
import { loginValidator } from '#validators/login'
import { registerValidator } from '#validators/registrer'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ response, request }: HttpContext) {
    try {
      const validatedData = await request.validateUsing(loginValidator)
      const user = await User.query()
        .where('username', '=', validatedData.username)
        .where('active', '=', true)
        .firstOrFail()

      if (!(await hash.verify(user.password, validatedData.password))) {
        return response.status(401).json('Неверные учетные данные!')
      }

      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '30 days' })

      return {
        type: 'bearer',
        value: token.value?.release(),
      }
    } catch (error) {
      console.log(error)

      return response.status(404).json('Пользователя с такими данными не существует!')
    }
  }

  async logout({ response, auth }: HttpContext) {
    try {
      const user = await auth.use('api').authenticate()

      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return response.status(200).json({ revoke: true })
    } catch (error) {
      console.log(error)

      return response.status(401).json(error)
    }
  }

  async register({ request, response }: HttpContext) {
    try {
      const validatedData = await request.validateUsing(registerValidator)

      await User.create(validatedData)

      return response.status(201).json({ message: 'User create!' })
    } catch (error) {
      console.log(error)
      return response.status(422).json(error)
    }
  }
}
