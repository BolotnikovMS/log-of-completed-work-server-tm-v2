import { VoltageClassDto } from '#dtos/voltage_classes/index'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import VoltageClass from '#models/voltage_class'
import VoltageClassPolicy from '#policies/voltage_class_policy'
import VoltageClassService from '#services/voltage_class_service'
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

    const voltageClass = await VoltageClassService.createDistrict(request, auth)

    return response.status(201).json(voltageClass)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const voltageClassParams = params as IParams
    const updVoltageClass = await VoltageClassService.updateDistrict(request, voltageClassParams)

    return response.status(200).json(updVoltageClass)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const voltageClassParams = params as IParams

    await VoltageClassService.deleteDistrict(voltageClassParams)

    return response.status(204)
  }
}
