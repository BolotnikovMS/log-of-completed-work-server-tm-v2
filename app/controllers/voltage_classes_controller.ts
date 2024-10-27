import VoltageClassDto from '#dtos/voltage_class'
import { accessErrorMessages } from '#helpers/access_error_messages'
import VoltageClass from '#models/voltage_class'
import VoltageClassPolicy from '#policies/voltage_class_policy'
import VoltageClassService from '#services/voltage_class_service'
import { voltageClassValidator } from '#validators/voltage_class'
import type { HttpContext } from '@adonisjs/core/http'

export default class VoltageClassesController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await VoltageClassService.getVoltageClasses(request)
    const voltageClasses = { meta, data: data.map(voltageClass => new VoltageClassDto(voltageClass as VoltageClass)) }

    return response.status(200).json(voltageClasses)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(voltageClassValidator)
    const voltageClass = await VoltageClass.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(voltageClass)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const voltageClass = await VoltageClass.findOrFail(params.id)
    const validatedData = await request.validateUsing(voltageClassValidator)
    const updVoltageClass = await voltageClass.merge(validatedData).save()

    return response.status(200).json(updVoltageClass)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const voltageClass = await VoltageClass.findOrFail(params.id)

    await voltageClass.delete()

    return response.status(204)
  }
}
