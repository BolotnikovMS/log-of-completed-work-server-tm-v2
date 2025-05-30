import { ChannelingEquipmentDto } from '#dtos/channeling_equipment/index'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import ChannelingEquipment from '#models/channeling_equipment'
import ChannelingEquipmentPolicy from '#policies/channeling_equipment_policy'
import ChannelingEquipmentService from '#services/channeling_equipment_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelingEquipmentsController {
  async index({ request, response }: HttpContext) {
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

    return response.status(200).json(equipment)
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
