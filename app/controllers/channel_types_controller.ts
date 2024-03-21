import ChannelType from '#models/channel_type'
import ChannelTypeService from '#services/channel_type_service'
import { chanelTypeValidator } from '#validators/channel_type'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelTypesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const channelTypes = await ChannelTypeService.getChannelTypes(request)

    return response.status(200).json(channelTypes)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const { user } = auth
    const validatedData = await request.validateUsing(chanelTypeValidator)
    const channelType = await ChannelType.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(channelType)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const channelType = await ChannelType.findOrFail(params.id)
    const validatedData = await request.validateUsing(chanelTypeValidator)
    const updChannelType = await channelType.merge(validatedData).save()

    return response.status(200).json(updChannelType)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const channelType = await ChannelType.findOrFail(params.id)

    await channelType.delete()

    return response.status(204)
  }
}
