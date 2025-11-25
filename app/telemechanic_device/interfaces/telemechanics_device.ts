export interface CreateTelemechanicsDevice {
  userId: number
  substationId: number
  typeKpId: number
  headControllerId: number
  controllerFirmwareVersion?: string | null
  note?: string | null
}

export interface UpdateTelemechanicsDevice {
  substationId?: number
  typeKpId?: number
  headControllerId?: number
  controllerFirmwareVersion?: string | null
  note?: string | null
}
