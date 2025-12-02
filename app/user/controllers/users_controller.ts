import UserPolicy from '#policies/user_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { IParams } from '#shared/interfaces/index'
import { UserBaseDto, UserFullDto, UserShortDto } from '#user/dtos/index'
import type { UserQueryParams } from '#user/interfaces/index'
import User from '#user/models/user'
import RoleService from '#user/services/role_service'
import UserService from '#user/services/user_service'
import { blockUserAccountValidator, changePasswordValidator, changeUserRole, queryParamsUsersValidator, registerValidator } from '#user/validators/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as UserQueryParams
    const validatedFilters = await queryParamsUsersValidator.validate(filters)
    const data = await UserService.getUsers(validatedFilters)
    const users = UserBaseDto.fromPaginator(data)

    return response.status(200).json(users)
  }

  async getShortUsers({ response }: HttpContext) {
    try {
      const data = await UserService.getUsers()
      const shortUsers = UserShortDto.fromPaginator(data)

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
      const user = await UserService.findById(userParams.id)

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
      const validatedData = await request.validateUsing(registerValidator)

      await UserService.createAccount(validatedData)

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

    const validatedData = await request.validateUsing(changePasswordValidator)
    const resetPassword = await UserService.changePassword(params.id, validatedData)

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
    const validatedData = await request.validateUsing(blockUserAccountValidator)

    await UserService.blockAccount(userParams.id, validatedData)

    return response.status(200).json('Статус УЗ пользователя успешно изменен!')
  }

  async changeRole({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('changeRole')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const { id } = params as IParams
    const user = await User.findOrFail(id)

    if (!user.active) return response.status(400).json({ message: 'УЗ пользователя заблокирована!' })

    const validatedData = await request.validateUsing(changeUserRole)

    await UserService.changeRole(id, validatedData)

    return response.status(200).json('Роль пользователя изменена!')
  }
}
