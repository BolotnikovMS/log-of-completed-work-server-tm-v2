import VoltageClassPolicy from '#policies/voltage_class_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import { IParams } from '#shared/interfaces/params'
import { IQueryParams } from '#shared/interfaces/query_params'
import { queryParamsValidator } from '#shared/validators/index'
import VoltageClassDto from '#voltage_class/dtos/voltage_class'
import VoltageClassService from '#voltage_class/services/voltage_class_service'
import { voltageClassValidator } from '#voltage_class/validators/voltage_class'
import { HttpContext } from '@adonisjs/core/http'

export default class VoltageClassesController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as IQueryParams
    const validatedFilters = await queryParamsValidator.validate(filters)
    const data = await VoltageClassService.getVoltageClasses(validatedFilters)
    const voltageClasses = VoltageClassDto.fromPaginator(data)

    return response.status(200).json(voltageClasses)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(voltageClassValidator)
    const voltageClass = await VoltageClassService.create({...validatedData, userId: auth.user!.id})

    return response.status(201).json(voltageClass)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const voltageClassParams = params as IParams
    const validatedData = await request.validateUsing(voltageClassValidator)
    const updVoltageClass = await VoltageClassService.update(voltageClassParams.id, validatedData)

    return response.status(200).json(updVoltageClass)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(VoltageClassPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const voltageClassParams = params as IParams

    await VoltageClassService.delete(voltageClassParams.id)

    return response.status(204)
  }
}
