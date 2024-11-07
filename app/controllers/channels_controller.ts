import ChannelDto from '#dtos/channel'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import Channel from '#models/channel'
import ChannelPolicy from '#policies/channel_policy'
import ChannelService from '#services/channel_service'
import { channelValidator } from '#validators/channel'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelsController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await ChannelService.getChannels(request)
    const channels = { meta, data: data.map(channel => new ChannelDto(channel as Channel)) }

    return response.status(200).json(channels)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const channel = await ChannelService.createChannel(request, auth)

    return response.status(200).json(channel)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channelParams = params as IParams
    const updChannel = await ChannelService.updateChannel(request, channelParams)

    return response.status(200).json(updChannel)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channelParams = params as IParams
    
    await ChannelService.deleteChannel(channelParams)

    return response.status(204)
  }

  async downloadExcel({ request, response }: HttpContext) {
    const buffer = await ChannelService.createExcelFile(request)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }
}
