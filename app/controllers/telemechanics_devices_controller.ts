import { TUrlParamId } from '#domains/params/types/index'
import { TelemechanicsDeviceInfoDto, TelemechanicsDeviceListDto } from '#domains/telemechanics_devices/dtos/index'
import { accessErrorMessages } from '#helpers/access_error_messages'
import TelemechanicsDevicePolicy from '#policies/telemechanics_device_policy'
import { TelemechanicsDeviceService } from '#services/telemechanics_device_service'
import { queryParamsValidator } from '#validators/query_param'
import { telemechanicsDeviceValidator } from '#validators/telemechanics_device'
import { urlParamIdValidator } from '#validators/url_params_id'
import type { HttpContext } from '@adonisjs/core/http'

export default class TelemechanicsDevicesController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs()
    const validatedFilters = await queryParamsValidator.validate(filters)
    const data = await TelemechanicsDeviceService.findAll(validatedFilters)
    const telemechanicsDevices = TelemechanicsDeviceListDto.fromPaginator(data)

    return response.status(200).json(telemechanicsDevices)
  }

  async getTelemechanicsDeviceById({ response, params }: HttpContext) {
    const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const telemechanicsDevice = await TelemechanicsDeviceService.findById(id)

    return response.status(200).json(telemechanicsDevice)
  }

  async getTelemechanicsDeviceInfoById({ response, params }: HttpContext) {
    const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const data = await TelemechanicsDeviceService.findInfoById(id)
    const telemechanicsDevice = new TelemechanicsDeviceInfoDto(data)

    return response.status(200).json(telemechanicsDevice)
  }

  async store({ request, response, bouncer, auth }: HttpContext) {
    if (await bouncer.with(TelemechanicsDevicePolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(telemechanicsDeviceValidator)
    const telemechanicsDevice = await TelemechanicsDeviceService.create({
      userId: user?.id!,
      ...validatedData,
    })

    return response.status(201).json(telemechanicsDevice)
  }

  async update({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(TelemechanicsDevicePolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const validatedData = await request.validateUsing(telemechanicsDeviceValidator)
    const updTelemechanicsDevice = await TelemechanicsDeviceService.update(id, validatedData)

    return response.status(200).json(updTelemechanicsDevice)
  }

  async destroy({ response, params, bouncer }: HttpContext) {
    if (await bouncer.with(TelemechanicsDevicePolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const { id }: TUrlParamId = await urlParamIdValidator.validate(params)

    await TelemechanicsDeviceService.delete(id)

    return response.status(204)
  }
}
