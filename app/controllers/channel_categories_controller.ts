import { accessErrorMessages } from '#helpers/access_error_messages'
import ChannelCategory from '#models/channel_category'
import ChannelCategoryPolicy from '#policies/channel_category_policy'
import ChannelCategoryService from '#services/channel_category_service'
import { channelCategoryValidator } from '#validators/channel_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelCategoriesController {
  async index({ request, response }: HttpContext) {
    const channelCategories = await ChannelCategoryService.getChannelCategories(request)

    return response.status(200).json(channelCategories)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(channelCategoryValidator)
    const channelCategory = await ChannelCategory.create({ userId: user?.id, ...validatedData })

    return response.status(200).json(channelCategory)

  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channelCategory = await ChannelCategory.findOrFail(params.id)
    const validatedData = await request.validateUsing(channelCategoryValidator)
    const updChannelCategory = await channelCategory.merge(validatedData).save()

    return response.status(200).json(updChannelCategory)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channelCategory = await ChannelCategory.findOrFail(params.id)

    await channelCategory.delete()

    return response.status(204)
  }
}
