import User from '#models/user'
import { loginValidator } from '#validators/login'
import { registerValidator } from '#validators/registrer'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import DB from '@adonisjs/lucid/services/db'

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
      await DB.from('auth_access_tokens').where('tokenable_id', user.id).delete()

      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '10 days' })
      // response.cookie('access_token', token.value?.release())
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
      // console.log(userSerialize)

      return {
        user: userSerialize,
        token: {
          type: 'bearer',
          token: token.value?.release(),
          expiresIn: token.expiresAt,
        },
      }
    } catch (error) {
      console.log(error)

      return response.status(401).json('Неверный username или пароль!')
    }
  }

  async profile({ response, request, auth }: HttpContext) {
    const user = await auth.authenticate()

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
