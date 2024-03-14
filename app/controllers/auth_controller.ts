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

      await user.load('role')

      // {
      //   id: 1,
      //   username: 'Admin',
      //   email: 'admin@worktm.ru',
      //   role: { name: 'Admin' },
      //   fullName: 'Admin Admin Admin',
      //   shortName: 'Admin A.A.'
      // }
      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '30 days' })
      const userSerialize = user.serialize({
        fields: { pick: ['id', 'username', 'fullName', 'shortName', 'email'] },
        relations: {
          role: {
            fields: {
              pick: ['name'],
            },
          },
        },
      })
      console.log(userSerialize)

      return {
        ...userSerialize,
        type: 'bearer',
        token: token.value?.release(),
      }
    } catch (error) {
      console.log(error)

      return response.status(401).json('Неверный username или пароль!')
    }
  }

  async logout({ response, auth }: HttpContext) {
    try {
      const user = await auth.use('api').authenticate()

      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return response.status(200).json({ revoke: true })
    } catch (error) {
      const message = 'Вы не авторизованны!'

      return response.status(401).json(message)
    }
  }

  async register({ request, response }: HttpContext) {
    try {
      const validatedData = await request.validateUsing(registerValidator)

      await User.create(validatedData)

      return response.status(201).json('Пользователь создан!')
    } catch (error) {
      console.log(error)
      return response.status(422).json(error.messages)
    }
  }
}
