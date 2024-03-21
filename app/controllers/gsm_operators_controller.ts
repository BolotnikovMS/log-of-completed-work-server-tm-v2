import GsmOperator from '#models/gsm_operator'
import GsmOperatorService from '#services/gsm_operator_service'
import { gsmOperatorValidator } from '#validators/gsm_operator'
import type { HttpContext } from '@adonisjs/core/http'

export default class GsmOperatorsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const gsmOperators = await GsmOperatorService.getGsmOperators(request)

    return response.status(200).json(gsmOperators)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const { user } = auth
    const validatedData = await request.validateUsing(gsmOperatorValidator)
    const gsmOperator = await GsmOperator.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(gsmOperator)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const gsmOperator = await GsmOperator.findOrFail(params.id)
    const validatedData = await request.validateUsing(gsmOperatorValidator)
    const updGsmOperator = await gsmOperator.merge(validatedData).save()

    return response.status(200).json(updGsmOperator)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const gsmOperator = await GsmOperator.findOrFail(params.id)

    await gsmOperator.delete()

    return response.status(204)
  }
}
