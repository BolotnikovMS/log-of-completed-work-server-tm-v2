import GsmOperatorDto from '#dtos/gsm_operator'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import GsmOperatorPolicy from '#policies/gsm_operator_policy'
import GsmOperatorService from '#services/gsm_operator_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class GsmOperatorsController {
  async index({ request, response }: HttpContext) {
    const data = await GsmOperatorService.getGsmOperators(request)
    const gsmOperators = data.map(gsm => new GsmOperatorDto(gsm))

    return response.status(200).json(gsmOperators)
  }
  
  async getGsmOperator({ params, response }: HttpContext) {
    const gsmOperatorParams = params as IParams
    const gsmOperator = await GsmOperatorService.getGsmOperatorById(gsmOperatorParams)

    return response.status(200).json(gsmOperator)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const gsmOperator = await GsmOperatorService.createGsmOperator(request, auth)

    return response.status(201).json(gsmOperator)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const gsmOperatorParams = params as IParams
    const updGsmOperator = await GsmOperatorService.updateGsmOperator(request, gsmOperatorParams)

    return response.status(200).json(updGsmOperator)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(GsmOperatorPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const gsmOperatorParams = params as IParams

    await GsmOperatorService.deleteGsmOperator(gsmOperatorParams)

    return response.status(204)
  }
}
