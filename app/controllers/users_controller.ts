import { accessErrorMessages } from '#helpers/access_error_messages'
import User from '#models/user'
import UserPolicy from '#policies/user_policy'
import RoleService from '#services/role_service'
import UserService from '#services/user_service'
import { blockUserAccountValidator } from '#validators/block_user_account'
import { changeUserRole } from '#validators/change_user_role'
import { registerValidator } from '#validators/registrer'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ request, response }: HttpContext) {
    const users = await UserService.getUsers(request)

    return response.status(200).json(users)
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
      const validatedData = await request.validateUsing(registerValidator)

      await User.create(validatedData)

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
      return response.status(400).json('Ошибка при изменении пароля')
    }
  }

  async blockUserAccount({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('blockAccount')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const user = await User.findOrFail(params.id)
    const validatedData = await request.validateUsing(blockUserAccountValidator)

    await user.merge(validatedData).save()

    return response.status(200).json('Статус УЗ пользователя успешно изменен!')
  }

  async changeRole({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('changeRole')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const user = await User.findOrFail(params.id)
    const validatedData = await request.validateUsing(changeUserRole)

    await user.merge(validatedData).save()

    return response.status(200).json('Роль пользователя изменена!')
  }
}
