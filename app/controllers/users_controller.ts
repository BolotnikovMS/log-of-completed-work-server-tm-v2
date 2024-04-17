import { accessErrorMessages } from '#helpers/access_error_messages'
import User from '#models/user'
import UserPolicy from '#policies/user_policy'
import RoleService from '#services/role_service'
import UserService from '#services/user_service'
import { registerValidator } from '#validators/registrer'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const users = await UserService.getUsers(request)

    return response.status(200).json(users)
  }

  async getRoles({ request, response, bouncer }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('viewRoles')) {
      return response.status(403).json({ message: accessErrorMessages.view })
    }

    const roles = await RoleService.getRoles()

    return response.status(200).json(roles)
  }

  /**
   * Handle form submission for the create action
   */
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

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  // async destroy({ params }: HttpContext) {}
}
