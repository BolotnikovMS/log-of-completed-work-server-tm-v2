import { accessErrorMessages } from '#helpers/access_error_messages'
import VoltageClass from '#models/voltage_class'
import VoltageClassPolicy from '#policies/voltage_class_policy'
import VoltageClassService from '#services/voltage_class_service'
import { voltageClassValidator } from '#validators/voltage_class'
import type { HttpContext } from '@adonisjs/core/http'

export default class VoltageClassesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const voltageClasses = await VoltageClassService.getVoltageClasses(request)

    return response.status(200).json(voltageClasses)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(voltageClassValidator)
    const voltageClass = await VoltageClass.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(voltageClass)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const voltageClass = await VoltageClass.findOrFail(params.id)
    const validatedData = await request.validateUsing(voltageClassValidator)
    const updVoltageClass = await voltageClass.merge(validatedData).save()

    return response.status(200).json(updVoltageClass)
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const voltageClass = await VoltageClass.findOrFail(params.id)

    await voltageClass.delete()

    return response.status(204)
  }
}
