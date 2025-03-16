import { DistrictDto, DistrictShortDto } from '#dtos/districts/index'
import { SubstationListDto } from '#dtos/substations/index'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import District from '#models/district'
import Substation from '#models/substation'
import DistrictPolicy from '#policies/district_policy'
import DistrictService from '#services/district_service'
import SubstationService from '#services/substation_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DistrictsController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await DistrictService.getDistricts(request)
    const districts = { meta, data: data.map(district => new DistrictShortDto(district as District)) }

    return response.status(200).json(districts)
  }

  async getSubstations({ params, request, response }: HttpContext) {
    const district = await District.findOrFail(params.id)
    const { meta, data } = await SubstationService.getSubstations(request, district.id)
    const substations = { meta, data: data.map(substation => new SubstationListDto(substation as Substation)) }

    return response.status(200).json(substations)
  }

  async getDistrict({ params, response }: HttpContext) {
    const districtParams = params as IParams
    const data = await DistrictService.getDistrictById(districtParams)
    const district = new DistrictDto(data as District)

    return response.status(200).json(district)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(DistrictPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const district = await DistrictService.createDistrict(request, auth)

    return response.status(201).json(district)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(DistrictPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const districtParams = params as IParams
    const updDistrict = await DistrictService.updateDistrict(request, districtParams)

    return response.status(200).json(updDistrict)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(DistrictPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const districtParams = params as IParams

    await DistrictService.deleteDistrict(districtParams)

    return response.status(204)
  }
}
