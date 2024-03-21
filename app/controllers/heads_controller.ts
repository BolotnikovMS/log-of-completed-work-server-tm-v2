import HeadController from '#models/head_controller'
import { HeadControllersService } from '#services/head_controller_service'
import { headControllerValidator } from '#validators/head_controller'
import type { HttpContext } from '@adonisjs/core/http'

export default class HeadsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const headControllers = await HeadControllersService.getHeadControllers(request)

    return response.status(200).json(headControllers)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const { user } = auth
    const validatedData = await request.validateUsing(headControllerValidator)
    const newHeadController = await HeadController.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(newHeadController)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const headController = await HeadController.findOrFail(params.id)
    const validatedData = await request.validateUsing(headControllerValidator)
    const updHeadController = await headController.merge(validatedData).save()

    return response.status(200).json(updHeadController)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const headController = await HeadController.findOrFail(params.id)

    await headController.delete()

    return response.status(204)
  }
}
