import ChannelCategoryDto from '#channel_category/dtos/channel_category'
import ChannelCategoryService from '#channel_category/services/channel_category_service'
import { createChannelCategoryValidator, updateChannelCategoryValidator } from '#channel_category/validators/index'
import ChannelCategoryPolicy from '#policies/channel_category_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import { type IParams } from '#shared/interfaces/params'
import type { BaseQueryParams } from '#shared/interfaces/query_params'
import { baseQueryParamsValidator } from '#shared/validators/query_param'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelCategoriesController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as BaseQueryParams
    const validatedFilters = await baseQueryParamsValidator.validate(filters)
    const data = await ChannelCategoryService.getChannelCategories(validatedFilters)
    const channelCategories = ChannelCategoryDto.fromPaginator(data)

    return response.status(200).json(channelCategories)
  }

  async getChannelCategory({ params, response }: HttpContext) {
    const channelCategoryParams = params as IParams
    const channelCategory = await ChannelCategoryService.findById(channelCategoryParams.id)

    return response.status(200).json(channelCategory)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createChannelCategoryValidator)
    const channelCategory = await ChannelCategoryService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(200).json(channelCategory)

  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const channelCategoryParams = params as IParams
    const validatedData = await request.validateUsing(updateChannelCategoryValidator)
    const updChannelCategory = await ChannelCategoryService.update(channelCategoryParams.id, validatedData)

    return response.status(200).json(updChannelCategory)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelCategoryPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const channelCategoryParams = params as IParams

    await ChannelCategoryService.delete(channelCategoryParams.id)

    return response.status(204)
  }
}
