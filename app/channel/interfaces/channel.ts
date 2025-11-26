export interface CreateChannel {
  userId: number
  substationId: number
  channelCategoryId: number
  channelTypeId: number
  channelEquipmentId?: number | null
  gsmId?: number | null
  ipAddress?: string | null
  note?: string | null
}

export interface UpdateChannel {
  substationId?: number
  channelCategoryId?: number
  channelTypeId?: number
  channelEquipmentId?: number | null
  gsmId?: number | null
  ipAddress?: string | null
  note?: string | null
}
