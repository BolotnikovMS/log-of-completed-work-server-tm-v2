import ChannelingEquipmentDto from '#dtos/channeling_equipment'
import { accessErrorMessages } from '#helpers/access_error_messages'
import ChannelingEquipment from '#models/channeling_equipment'
import ChannelingEquipmentPolicy from '#policies/channeling_equipment_policy'
import ChannelingEquipmentService from '#services/channeling_equipment_service'
import { channelingEquipmant } from '#validators/channeling_equipment'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChannelingEquipmentsController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await ChannelingEquipmentService.getChannelingEquipments(request)
    const channelingEquipments = { meta, data: data.map(channelEquipment => new ChannelingEquipmentDto(channelEquipment as ChannelingEquipment)) }

    return response.status(200).json(channelingEquipments)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(channelingEquipmant)
    const equipment = await ChannelingEquipment.create({ userId: user?.id, ...validatedData })

    return response.status(200).json(equipment)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const equipment = await ChannelingEquipment.findOrFail(params.id)
    const validatedData = await request.validateUsing(channelingEquipmant)
    const updEquipment = await equipment.merge(validatedData).save()

    return response.status(200).json(updEquipment)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ChannelingEquipmentPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const equipment = await ChannelingEquipment.findOrFail(params.id)

    await equipment.delete()

    return response.status(204)
  }
}
