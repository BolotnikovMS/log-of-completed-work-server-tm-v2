import { accessErrorMessages } from '#helpers/access_error_messages'
import GsmOperator from '#models/gsm_operator'
import GsmOperatorPolicy from '#policies/gsm_operator_policy'
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
  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(gsmOperatorValidator)
    const gsmOperator = await GsmOperator.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(gsmOperator)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const gsmOperator = await GsmOperator.findOrFail(params.id)
    const validatedData = await request.validateUsing(gsmOperatorValidator)
    const updGsmOperator = await gsmOperator.merge(validatedData).save()

    return response.status(200).json(updGsmOperator)
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const gsmOperator = await GsmOperator.findOrFail(params.id)

    await gsmOperator.delete()

    return response.status(204)
  }
}
