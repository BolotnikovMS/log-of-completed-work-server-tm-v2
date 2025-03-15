import { ChannelCategoryDto } from '#dtos/channel_categories/index'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import ChannelCategory from '#models/channel_category'
import ChannelCategoryPolicy from '#policies/channel_category_policy'
import ChannelCategoryService from '#services/channel_category_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelCategoriesController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await ChannelCategoryService.getChannelCategories(request)
    const channelCategories = { meta, data: data.map(channelCategory => new ChannelCategoryDto(channelCategory as ChannelCategory))}

    return response.status(200).json(channelCategories)
  }
  
  async getChannelCategory({ params, response }: HttpContext) {
    const channelCategoryParams = params as IParams
    const channelCategory = await ChannelCategoryService.getChannelCategoryById(channelCategoryParams)

    return response.status(200).json(channelCategory)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const channelCategory = await ChannelCategoryService.createChannelCategory(request, auth)

    return response.status(200).json(channelCategory)

  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channelCategoryParams = params as IParams
    const updChannelCategory = await ChannelCategoryService.updateChannelCategory(request, channelCategoryParams)

    return response.status(200).json(updChannelCategory)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channelCategoryParams = params as IParams

    await ChannelCategoryService.deleteChannelCategory(channelCategoryParams)

    return response.status(204)
  }
}
