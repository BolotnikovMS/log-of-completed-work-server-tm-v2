import { accessErrorMessages } from '#helpers/access_error_messages'
import Channel from '#models/channel'
import ChannelPolicy from '#policies/channel_policy'
import ChannelService from '#services/channel_service'
import { channelValidator } from '#validators/channel'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelsController {
  async index({ request, response }: HttpContext) {
    const channels = await ChannelService.getChannels(request)

    return response.status(200).json(channels)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(channelValidator)
    const channel = await Channel.create({ userId: user?.id, ...validatedData })

    return response.status(200).json(channel)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channel = await Channel.findOrFail(params.id)
    const validatedData = await request.validateUsing(channelValidator)
    const updChannel = await channel.merge(validatedData).save()

    return response.status(200).json(updChannel)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channel = await Channel.findOrFail(params.id)

    await channel.delete()

    return response.status(204)
  }

  async downloadExcel({ request, response }: HttpContext) {
    const buffer = await ChannelService.createExcelFile(request)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }
}
