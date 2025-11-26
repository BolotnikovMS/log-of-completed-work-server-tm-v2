import { ChannelDto, ChannelInfoDto, ChannelListDto } from '#channel/dtos/index'
import type { ChannelQueryParams } from '#channel/interfaces/query_params_channels'
import ChannelService from '#channel/services/channel_service'
import { createChannelValidator, queryParamsChannelValidator, updateChannelValidator } from '#channel/validators/index'
import ChannelPolicy from '#policies/channel_policy'
import ReportService from '#report/services/report_service'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { IParams } from '#shared/interfaces/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelsController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as ChannelQueryParams
    const validatedFilters = await queryParamsChannelValidator.validate(filters)
    const data = await ChannelService.getChannels(validatedFilters)
    const channels = ChannelListDto.fromPaginator(data)

    return response.status(200).json(channels)
  }

  async getChannel({ params, response }: HttpContext) {
    const channelParams = params as IParams
    const channel = new ChannelDto(await ChannelService.findById(channelParams.id))

    return response.status(200).json(channel)
  }

  async getChannelInfo({ params, response }: HttpContext) {
    const channelParams = params as IParams
    const channel = new ChannelInfoDto(await ChannelService.findById(channelParams.id))

    return response.status(200).json(channel)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createChannelValidator)
    const channel = await ChannelService.create({
      ...validatedData,
      userId: auth.user!.id
    })

    return response.status(201).json(channel)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channelParams = params as IParams
    const validatedData = await request.validateUsing(updateChannelValidator)
    const updChannel = await ChannelService.update(channelParams.id, validatedData)

    return response.status(200).json(updChannel)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channelParams = params as IParams

    await ChannelService.deleteChannel(channelParams.id)

    return response.status(204)
  }

  async downloadExcel({ request, response }: HttpContext) {
    const buffer = await ReportService.createExcelChannels(request)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }
}
