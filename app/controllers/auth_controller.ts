import User from '#models/user'
import UserService from '#services/user_service'
import { loginValidator } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import DB from '@adonisjs/lucid/services/db'

export default class AuthController {
  /**
  * @login
  * @description Аутентификация пользователя и получение токена.
  * @requestBody {"username": "", "password": ""}
  * @responseHeader 200
  // * @responseBody 200 - <User>.with(relations).exclude(id, created_at, updated_at)
  * @responseBody 200 - {"user": {"id": 999, "username": "test", "position": "Test", "email": "test@mail.ru", "role": {"name": "User"}, "fullName": "Test Test Test", "shortName": "Test T.T."}, "token": {"type": "bearer", "token":"token", "expiresIn": "date"}}
  * @responseHeader 400
  * @responseBody 400 - Учетная запись заблокирована!
  * @responseHeader 404
  * @responseBody 404 - Неверные учетные данные!
  */
  async login({ response, request }: HttpContext) {
    try {
      const { username, password } = await request.validateUsing(loginValidator)
      const user = await User.query().whereLike('username', username).firstOrFail()

      if (!user.active) return response.status(400).json('Учетная запись заблокирована!')

      if (!(await hash.verify(user.password, password)))
        return response.status(400).json('Неверные учетные данные!')

      await user.load('role')
      await DB.from('auth_access_tokens').where('tokenable_id', user.id).delete()

      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '10 days' })
      const userSerialize = user.serialize({
        fields: { pick: ['id', 'username', 'fullName', 'shortName', 'email', 'position'] },
        relations: {
          role: {
            fields: {
              pick: ['name'],
            },
          },
        },
      })

      // response.cookie('access_token', token.value?.release())
      return {
        user: userSerialize,
        token: {
          type: 'bearer',
          token: token.value?.release(),
          expiresIn: token.expiresAt,
        },
      }
    } catch (e) {
      console.log(e)
      return response.status(404).json('Неверные учетные данные!')
    }
  }

  async profile({ response, auth }: HttpContext) {
    const user = await auth.authenticate()

    if (!user.active) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return response.status(401).json('Учетная запись заблокирована!')
    }

    await user.load('role')
    // console.log(user.serialize())
    // const test = request.cookie('access_token')
    // console.log('Cook', test)

    const userSerialize = user.serialize({
      fields: {
        omit: ['password', 'updatedAt'],
      },
      relations: {
        role: {
          fields: {
            omit: ['createdAt', 'updatedAt'],
          },
        },
      },
    })

    return response.status(200).json(userSerialize)
  }

  async changePassword({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()

    if (!user.active) {
      return response.status(401).json('Учетная запись заблокирована!')
    }

    const changePassword = await UserService.changePassword(request, user.id)

    if (changePassword) {
      return response.status(200).json('Пароль пользователя успешно изменен!')
    } else {
      return response.status(400).json('Ошибка при изменении пароля')
    }
  }

  async logout({ response, auth }: HttpContext) {
    try {
      const user = await auth.use('api').authenticate()

      // response.clearCookie('access_token')
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return response.status(200).json({ message: 'Вы успешно вышли из системы!' })
    } catch (error) {
      return response.status(401).json('Вы не авторизованны!')
    }
  }
}
