import CompletedWork from '#models/completed_work'
import CompletedWorkService from '#services/completed_wokr_service'
import { completedWorkValidator } from '#validators/completed_work'
import type { HttpContext } from '@adonisjs/core/http'

export default class CompletedWorksController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const works = await CompletedWorkService.getCompletedWorks(request)

    return response.status(200).json(works)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const validatedData = request.validateUsing(completedWorkValidator)
    const completedWork = await CompletedWork.create({ userId: 1, ...validatedData })

    return response.status(201).json(completedWork)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const completedWork = await CompletedWork.findOrFail(params.id)
    const validatedData = await request.validateUsing(completedWorkValidator)
    const updCompletedWork = await completedWork
      .merge({ workProducerId: 1, ...validatedData })
      .save()

    return response.status(200).json(updCompletedWork)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const completedWork = await CompletedWork.findOrFail(params.id)

    await completedWork.delete()

    return response.status(204)
  }
}
