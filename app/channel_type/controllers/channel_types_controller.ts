import ChannelTypeDto from '#channel_type/dtos/channel_type'
import ChannelType from '#channel_type/models/channel_type'
import ChannelTypeService from '#channel_type/services/channel_type_service'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import ChannelTypePolicy from '#policies/channel_type_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelTypesController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await ChannelTypeService.getChannelTypes(request)
    const channelTypes = { meta, data: data.map(channelType => new ChannelTypeDto(channelType as ChannelType)) }

    return response.status(200).json(channelTypes)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const channelType = await ChannelTypeService.createChannelType(request, auth)

    return response.status(201).json(channelType)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channelTypeParams = params as IParams
    const updChannelType = await ChannelTypeService.updateChannelType(request, channelTypeParams)

    return response.status(200).json(updChannelType)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelTypePolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channelTypeParams = params as IParams

    await ChannelTypeService.deleteChannelType(channelTypeParams)

    return response.status(204)
  }
}
