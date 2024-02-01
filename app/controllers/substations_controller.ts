import Substation from '#models/substation'
import SubstationService from '#services/substation_service'
import { substationValidator } from '#validators/substation'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubstationsController {
  async index({ request, response }: HttpContext) {
    const substations = await SubstationService.getSubstations(request)

    return response.status(200).json(substations)
  }

  async store({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(substationValidator)
    const substation = await Substation.create({ userId: 1, ...validatedData })

    return response.status(201).json(substation)
  }

  async update({ params, request, response }: HttpContext) {
    const substation = await Substation.findOrFail(params.id)
    const validatedData = await request.validateUsing(substationValidator)
    const updDistrict = await substation.merge(validatedData).save()

    return response.status(200).json(updDistrict)
  }

  async destroy({ params, response }: HttpContext) {
    const substation = await Substation.findOrFail(params.id)

    await substation.related('works').query().delete()
    await substation.delete()

    return response.status(204)
  }
}
