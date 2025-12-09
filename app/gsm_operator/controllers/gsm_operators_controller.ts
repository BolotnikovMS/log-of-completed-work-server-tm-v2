import { GsmOperatorDto } from '#gsm_operator/dtos/index'
import GsmOperatorService from '#gsm_operator/services/gsm_operator_service'
import { createGsmOperatorValidator } from '#gsm_operator/validators/create_gsm_operator'
import { updateGsmOperatorValidator } from '#gsm_operator/validators/update_gsm_operator'
import GsmOperatorPolicy from '#policies/gsm_operator_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { BaseQueryParams, Params } from '#shared/interfaces/index'
import { baseQueryParamsValidator } from '#shared/validators/query_param'
import type { HttpContext } from '@adonisjs/core/http'

export default class GsmOperatorsController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as BaseQueryParams
    const validatedFilters = await baseQueryParamsValidator.validate(filters)
    const data = await GsmOperatorService.getGsmOperators(validatedFilters)
    const gsmOperators = GsmOperatorDto.fromArray(data)

    return response.status(200).json(gsmOperators)
  }

  async getGsmOperator({ params, response }: HttpContext) {
    const gsmOperatorParams = params as Params
    const gsmOperator = await GsmOperatorService.findById(gsmOperatorParams.id)

    return response.status(200).json(gsmOperator)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createGsmOperatorValidator)
    const gsmOperator = await GsmOperatorService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(gsmOperator)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const gsmOperatorParams = params as Params
    const validatedData = await request.validateUsing(updateGsmOperatorValidator)
    const updGsmOperator = await GsmOperatorService.update(gsmOperatorParams.id, validatedData)

    return response.status(200).json(updGsmOperator)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const gsmOperatorParams = params as Params

    await GsmOperatorService.delete(gsmOperatorParams.id)

    return response.status(204)
  }
}
