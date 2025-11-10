import UserPolicy from '#policies/user_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import { IParams } from '#shared/interfaces/params'
import { UserBaseDto, UserFullDto, UserShortDto } from '#user/dtos/index'
import User from '#user/models/user'
import RoleService from '#user/services/role_service'
import UserService from '#user/services/user_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await UserService.getUsers(request)
    const users = { meta, data: data.map(user => new UserBaseDto(user as User)) }

    return response.status(200).json(users)
  }

  async getShortUsers({ request, response }: HttpContext) {
    try {
      const { meta, data } = await UserService.getUsers(request)
      const shortUsers = { meta, data: data.map(user => new UserShortDto(user as User)) }

      return response.status(200).json(shortUsers)
    } catch (error) {
      console.error("Error in getUsers: ", error.message)

      return response.status(error.status).json({
        message: error.message
      })
    }
  }

  async getUser({ response, params }: HttpContext) {
    try {
      const userParams = params as IParams
      const user = await UserService.getUserById(userParams)

      return response.status(200).json(new UserFullDto(user))
    } catch (error) {
      console.error("Error in getUser: ", error.message)

      return response.status(error.status).json({
        message: error.message
      })
    }
  }

  async getRoles({ response, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('viewRoles')) {
      return response.status(403).json({ message: accessErrorMessages.view })
    }

    const roles = await RoleService.getRoles()

    return response.status(200).json(roles)
  }

  async createUserAccount({ request, response, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    try {
      await UserService.createUserAccount(request)

      return response.status(201).json('Аккаунт пользователя создан!')
    } catch (error) {
      console.log(error)
      return response.status(422).json(error.messages)
    }
  }

  async resetUserPassword({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('resetPassword')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const resetPassword = await UserService.changePassword(request, params.id)

    if (resetPassword) {
      return response.status(200).json('Пароль пользователя успешно изменен!')
    } else {
      return response.status(400).json({ message: 'Ошибка при изменении пароля!' })
    }
  }

  async blockUserAccount({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('blockAccount')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const userParams = params as IParams

    await UserService.blockUserAccount(request, userParams)

    return response.status(200).json('Статус УЗ пользователя успешно изменен!')
  }

  async changeRole({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('changeRole')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const { id } = params as IParams
    const user = await User.findOrFail(id)

    if (!user.active) return response.status(400).json({ message: 'УЗ пользователя заблокирована!' })

    await UserService.changeRole(request, user)

    return response.status(200).json('Роль пользователя изменена!')
  }
}
