import ChannelTypeDto from '#channel_type/dtos/channel_type'
import ChannelTypeService from '#channel_type/services/channel_type_service'
import { createChannelTypeValidator } from '#channel_type/validators/create_channel_type'
import { updateChannelTypeValidator } from '#channel_type/validators/index'
import ChannelTypePolicy from '#policies/channel_type_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { BaseQueryParams, Params } from '#shared/interfaces/index'
import { baseQueryParamsValidator } from '#shared/validators/query_param'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelTypesController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as BaseQueryParams
    const validatedFilters = await baseQueryParamsValidator.validate(filters)
    const data = await ChannelTypeService.getChannelTypes(validatedFilters)
    const channelTypes = ChannelTypeDto.fromPaginator(data)

    return response.status(200).json(channelTypes)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createChannelTypeValidator)
    const channelType = await ChannelTypeService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(channelType)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channelTypeParams = params as Params
    const validatedData = await request.validateUsing(updateChannelTypeValidator)
    const updChannelType = await ChannelTypeService.update(channelTypeParams.id, validatedData)

    return response.status(200).json(updChannelType)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channelTypeParams = params as Params

    await ChannelTypeService.delete(channelTypeParams.id)

    return response.status(204)
  }
}
