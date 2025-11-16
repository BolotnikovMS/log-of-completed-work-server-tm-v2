import ChannelingEquipmentDto from '#channeling_equipment/dtos/channeling_equipment'
import ChannelingEquipment from '#channeling_equipment/models/channeling_equipment'
import ChannelingEquipmentService from '#channeling_equipment/services/channeling_equipment_service'
import ChannelingEquipmentPolicy from '#policies/channeling_equipment_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { IParams } from '#shared/interfaces/params'
import type { QueryParams } from '#shared/interfaces/query_params'
import { queryParamsValidator } from '#shared/validators/query_param'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelingEquipmentsController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as QueryParams
    const validatedFilters = await queryParamsValidator.validate(filters)

    const { meta, data } = await ChannelingEquipmentService.getChannelingEquipments(request)
    const channelingEquipments = { meta, data: data.map(channelEquipment => new ChannelingEquipmentDto(channelEquipment as ChannelingEquipment)) }

    return response.status(200).json(channelingEquipments)
  }

  async getEquipment({ params, response }: HttpContext) {
    const equipmentParams = params as IParams
    const equipment = new ChannelingEquipmentDto(await ChannelingEquipmentService.getChannelingEquipmentById(equipmentParams))

    return response.status(200).json(equipment)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const equipment = await ChannelingEquipmentService.createChannelingEquipment(request, auth)

    return response.status(201).json(equipment)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const equipmentParams = params as IParams
    const updEquipment = await ChannelingEquipmentService.updateChannelingEquipment(request, equipmentParams)

    return response.status(200).json(updEquipment)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const equipmentParams = params as IParams

    await ChannelingEquipmentService.deleteChannelingEquipment(equipmentParams)

    return response.status(204)
  }
}
