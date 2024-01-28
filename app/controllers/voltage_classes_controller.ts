import VoltageClass from '#models/voltage_class'
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
  async store({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(voltageClassValidator)
    const voltageClass = await VoltageClass.create({ userId: 1, ...validatedData })

    return response.status(201).json(voltageClass)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const voltageClass = await VoltageClass.findOrFail(params.id)
    const validatedData = await request.validateUsing(voltageClassValidator)
    const updVoltageClass = await voltageClass.merge(validatedData).save()

    return response.status(200).json(updVoltageClass)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const voltageClass = await VoltageClass.findOrFail(params.id)

    await voltageClass.delete()

    return response.status(204)
  }
}
