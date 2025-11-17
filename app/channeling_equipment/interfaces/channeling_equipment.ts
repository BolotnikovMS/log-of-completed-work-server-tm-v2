export interface CreateChannelingEquipment {
  userId: number
  channelTypeId: number
  name: string
}

export interface UpdateChannelingEquipment {
  channelTypeId?: number
  name?: string
}
