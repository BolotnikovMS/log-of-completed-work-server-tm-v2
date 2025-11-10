import { ChannelDto, ChannelInfoDto, ChannelListDto } from '#channel/dtos/index'
import Channel from '#channel/models/channel'
import ChannelService from '#channel/services/channel_service'
import { IParams } from '#interfaces/params'
import ChannelPolicy from '#policies/channel_policy'
import ReportService from '#report/services/report_service'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelsController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await ChannelService.getChannels(request)
    const channels = { meta, data: data.map(channel => new ChannelListDto(channel as Channel)) }

    return response.status(200).json(channels)
  }

  async getChannel({ params, response }: HttpContext) {
    const channelParams = params as IParams
    const channel = new ChannelDto(await ChannelService.getChannelById(channelParams))

    return response.status(200).json(channel)
  }

  async getChannelInfo({ params, response }: HttpContext) {
    const channelParams = params as IParams
    const channel = new ChannelInfoDto(await ChannelService.getChannelById(channelParams))

    return response.status(200).json(channel)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const channel = await ChannelService.createChannel(request, auth)

    return response.status(201).json(channel)
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
    const buffer = await ReportService.createExcelChannels(request)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }
}
