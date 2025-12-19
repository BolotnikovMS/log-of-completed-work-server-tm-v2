import ChannelingEquipmentDto from '#channeling_equipment/dtos/channeling_equipment'
import ChannelingEquipmentService from '#channeling_equipment/services/channeling_equipment_service'
import { createChannelingEquipmant, queryParamsChannelingEquipmentValidator, updateChannelingEquipmant } from '#channeling_equipment/validators/index'
import ChannelingEquipmentPolicy from '#policies/channeling_equipment_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { Params } from '#shared/interfaces/params'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelingEquipmentsController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs()
    const validatedFilters = await queryParamsChannelingEquipmentValidator.validate(filters)
    const data = await ChannelingEquipmentService.getChannelingEquipments(validatedFilters)
    const channelingEquipments = ChannelingEquipmentDto.fromPaginator(data)

    return response.status(200).json(channelingEquipments)
  }

  async getEquipment({ params, response }: HttpContext) {
    const equipmentParams = params as Params
    const data = await ChannelingEquipmentService.getChannelingEquipmentById(equipmentParams.id)
    const equipment = new ChannelingEquipmentDto(data)

    return response.status(200).json(equipment)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createChannelingEquipmant)
    const equipment = await ChannelingEquipmentService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(equipment)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const equipmentParams = params as Params
    const validatedData = await request.validateUsing(updateChannelingEquipmant)
    const updEquipment = await ChannelingEquipmentService.update(equipmentParams.id, validatedData)

    return response.status(200).json(updEquipment)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const equipmentParams = params as Params

    await ChannelingEquipmentService.delete(equipmentParams.id)

    return response.status(204)
  }
}
