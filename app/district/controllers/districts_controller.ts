import { DistrictDto, DistrictShortDto } from '#district/dtos/index'
import District from '#district/models/district'
import DistrictService from '#district/services/district_service'
import { createDistrictValidator, updateDistrictValidator } from '#district/validators/index'
import DistrictPolicy from '#policies/district_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { Params } from '#shared/interfaces/index'
import { baseQueryParamsValidator } from '#shared/validators/query_param'
import SubstationListDto from '#substation/dtos/substation_lists'
import SubstationService from '#substation/services/substation_service'
import { queryParamsSubstationsValidator } from '#substation/validators/query_params_substations'
import type { HttpContext } from '@adonisjs/core/http'

export default class DistrictsController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs()
    const validatedFilters = await baseQueryParamsValidator.validate(filters)
    const data = await DistrictService.getDistricts(validatedFilters)
    const districts = DistrictShortDto.fromPaginator(data)

    return response.status(200).json(districts)
  }

  async getSubstations({ params, request, response }: HttpContext) {
    const district = await District.findOrFail(params.id)
    const filters = request.qs()
    const validatedFilters = await queryParamsSubstationsValidator.validate(filters)
    const data = await SubstationService.getSubstations(validatedFilters, district.id)
    const substations = SubstationListDto.fromPaginator(data)

    return response.status(200).json(substations)
  }

  async getDistrict({ params, response }: HttpContext) {
    const districtParams = params as Params
    const data = await DistrictService.findById(districtParams.id)
    const district = new DistrictDto(data)

    return response.status(200).json(district)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(DistrictPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createDistrictValidator)
    const district = await DistrictService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(district)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(DistrictPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const districtParams = params as Params
    const validatedData = await request.validateUsing(updateDistrictValidator)
    const updDistrict = await DistrictService.update(districtParams.id, validatedData)

    return response.status(200).json(updDistrict)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(DistrictPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const districtParams = params as Params

    await DistrictService.delete(districtParams.id)

    return response.status(204)
  }
}
