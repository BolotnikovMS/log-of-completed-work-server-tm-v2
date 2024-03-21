import District from '#models/district'
import DistrictService from '#services/district_service'
import SubstationService from '#services/substation_service'
import { districtValidator } from '#validators/district'
import type { HttpContext } from '@adonisjs/core/http'

export default class DistrictsController {
  async index({ request, response }: HttpContext) {
    const districts = await DistrictService.getDistricts(request)

    return response.status(200).json(districts)
  }

  async getSubstations({ params, request, response }: HttpContext) {
    const district = await District.findOrFail(params.id)
    const substations = await SubstationService.getSubstations(request, district.id)

    return response.status(200).json(substations)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const { user } = auth
    const validatedData = await request.validateUsing(districtValidator)
    const district = await District.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(district)
  }

  /**
   * Show individual record
   */
  // async getSubstations({ params, request, response }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const district = await District.findOrFail(params.id)
    const validatedData = await request.validateUsing(districtValidator)
    const updDistrict = await district.merge(validatedData).save()

    return response.status(200).json(updDistrict)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const district = await District.findOrFail(params.id)

    await district.delete()

    return response.status(204)
  }
}
