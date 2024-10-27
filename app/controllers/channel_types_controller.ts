import ChannelTypeDto from '#dtos/channel_type'
import { accessErrorMessages } from '#helpers/access_error_messages'
import ChannelType from '#models/channel_type'
import ChannelTypePolicy from '#policies/channel_type_policy'
import ChannelTypeService from '#services/channel_type_service'
import { chanelTypeValidator } from '#validators/channel_type'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelTypesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const { meta, data } = await ChannelTypeService.getChannelTypes(request)
    const channelTypes = { meta, data: data.map(channelType => new ChannelTypeDto(channelType as ChannelType)) }

    return response.status(200).json(channelTypes)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(chanelTypeValidator)
    const channelType = await ChannelType.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(channelType)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channelType = await ChannelType.findOrFail(params.id)
    const validatedData = await request.validateUsing(chanelTypeValidator)
    const updChannelType = await channelType.merge(validatedData).save()

    return response.status(200).json(updChannelType)
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channelType = await ChannelType.findOrFail(params.id)

    await channelType.delete()

    return response.status(204)
  }
}
