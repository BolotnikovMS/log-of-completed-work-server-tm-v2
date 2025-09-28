import { TUrlParamId } from '#domains/params/types/index';
import { TelemechanicsDeviceService } from '#services/telemechanics_device_service';
import { telemechanicsDeviceValidator } from '#validators/telemechanics_device';
import { urlParamIdValidator } from '#validators/url_params_id';
import type { HttpContext } from '@adonisjs/core/http';

export default class TelemechanicsDevicesController {
  async getTelemechanicsDeviceById({ response, params }: HttpContext) {
    const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const telemechanicsDevice = await TelemechanicsDeviceService.findById(id)

    return response.status(200).json(telemechanicsDevice)
  }

  async store({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(telemechanicsDeviceValidator)
    const telemechanicsDevice = await TelemechanicsDeviceService.create(validatedData)

    return response.status(201).json(telemechanicsDevice)
  }

  async update({ request, response, params }: HttpContext) {
    const { id }: TUrlParamId = await urlParamIdValidator.validate(params)
    const validatedData = await request.validateUsing(telemechanicsDeviceValidator)
    const updTelemechanicsDevice = await TelemechanicsDeviceService.update(id, validatedData)

    return response.status(200).json(updTelemechanicsDevice)
  }

  async destroy({ response, params }: HttpContext) {
    const { id }: TUrlParamId = await urlParamIdValidator.validate(params)

    await TelemechanicsDeviceService.delete(id)

    return response.status(204)
  }
}
