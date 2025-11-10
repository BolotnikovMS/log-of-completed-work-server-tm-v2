import ChannelingEquipment from '#channeling_equipment/models/channeling_equipment'
import { channelingEquipmant } from '#channeling_equipment/validators/channeling_equipment'
import { IParams, IQueryParams } from '#shared/interfaces/index'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class ChannelingEquipmentService {
  static async getChannelingEquipments(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { page, limit = -1, channelType } = req.qs() as IQueryParams
    const channelingEquipments = await ChannelingEquipment.query()
      .if(channelType, (query) => query.where('channelTypeId', '=', channelType))
      .preload('channel_type')
      .paginate(page, limit)

    return channelingEquipments.serialize()
  }

  static async getChannelingEquipmentById(params: IParams): Promise<ChannelingEquipment> {
    const equipment = await ChannelingEquipment.findOrFail(params.id)

    return equipment
  }

  static async createChannelingEquipment(req: Request, auth: Authenticator<Authenticators>): Promise<ChannelingEquipment> {
    const { user } = auth
    const validatedData = await req.validateUsing(channelingEquipmant)
    const equipment = await ChannelingEquipment.create({ userId: user?.id, ...validatedData })

    return equipment
  }

  static async updateChannelingEquipment(req: Request, params: IParams): Promise<ChannelingEquipment> {
    const equipment = await ChannelingEquipment.findOrFail(params.id)
    const validatedData = await req.validateUsing(channelingEquipmant)
    const updEquipment = await equipment.merge(validatedData).save()

    return updEquipment
  }

  static async deleteChannelingEquipment(params: IParams): Promise<void> {
    const equipment = await ChannelingEquipment.findOrFail(params.id)

    await equipment.delete()
  }
}
