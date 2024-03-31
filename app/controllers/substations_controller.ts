import { accessErrorMessages } from '#helpers/access_error_messages'
import Substation from '#models/substation'
import SubstationPolicy from '#policies/substation_policy'
import SubstationService from '#services/substation_service'
import { substationValidator } from '#validators/substation'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubstationsController {
  async index({ request, response }: HttpContext) {
    const substations = await SubstationService.getSubstations(request)

    return response.status(200).json(substations)
  }

  async getSubstation({ params, response }: HttpContext) {
    const substation = await SubstationService.getSubstation(params)

    return response.status(200).json(substation)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(substationValidator)
    const substation = await Substation.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(substation)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const substation = await Substation.findOrFail(params.id)
    const validatedData = await request.validateUsing(substationValidator)
    const updDistrict = await substation.merge(validatedData).save()

    return response.status(200).json(updDistrict)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const substation = await Substation.findOrFail(params.id)

    await substation.related('works').query().delete()
    await substation.delete()

    return response.status(204)
  }
}
