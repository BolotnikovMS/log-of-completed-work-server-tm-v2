import TelemechanicsDevicePolicy from '#policies/telemechanics_device_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { IParams } from '#shared/interfaces/params'
import { baseQueryParamsValidator } from '#shared/validators/index'
import { TelemechanicsDeviceInfoDto, TelemechanicsDeviceListDto } from '#telemechanic_device/dtos/index'
import { TelemechanicsDeviceService } from '#telemechanic_device/services/telemechanics_device_service'
import { createTelemechanicsDeviceValidator, updateTelemechanicsDeviceValidator } from '#telemechanic_device/validators/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class TelemechanicsDevicesController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs()
    const validatedFilters = await baseQueryParamsValidator.validate(filters)
    const data = await TelemechanicsDeviceService.findAll(validatedFilters)
    const telemechanicsDevices = TelemechanicsDeviceListDto.fromPaginator(data)

    return response.status(200).json(telemechanicsDevices)
  }

  async getTelemechanicsDeviceById({ response, params }: HttpContext) {
    // const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const telemechanicDeviceParam = params as IParams
    const telemechanicsDevice = await TelemechanicsDeviceService.findById(telemechanicDeviceParam.id)

    return response.status(200).json(telemechanicsDevice)
  }

  async getTelemechanicsDeviceInfoById({ response, params }: HttpContext) {
    // const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const telemechanicDeviceParam = params as IParams
    const data = await TelemechanicsDeviceService.findInfoById(telemechanicDeviceParam.id)
    const telemechanicsDevice = new TelemechanicsDeviceInfoDto(data)

    return response.status(200).json(telemechanicsDevice)
  }

  async store({ request, response, bouncer, auth }: HttpContext) {
    if (await bouncer.with(TelemechanicsDevicePolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(createTelemechanicsDeviceValidator)
    const telemechanicsDevice = await TelemechanicsDeviceService.create({
      ...validatedData,
      userId: user?.id!
    })

    return response.status(201).json(telemechanicsDevice)
  }

  async update({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(TelemechanicsDevicePolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    // const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const telemechanicDeviceParam = params as IParams
    const validatedData = await request.validateUsing(updateTelemechanicsDeviceValidator)
    const updTelemechanicsDevice = await TelemechanicsDeviceService.update(telemechanicDeviceParam.id, validatedData)

    return response.status(200).json(updTelemechanicsDevice)
  }

  async destroy({ response, params, bouncer }: HttpContext) {
    if (await bouncer.with(TelemechanicsDevicePolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    // const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const telemechanicDeviceParam = params as IParams

    await TelemechanicsDeviceService.delete(telemechanicDeviceParam.id)

    return response.status(204)
  }
}
