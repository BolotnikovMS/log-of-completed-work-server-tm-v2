export interface ITelemechanicsDevice {
  substationId: number
  typeKpId: number
  headControllerId: number
  controllerFirmwareVersion?: string | null
  note?: string | null
}

export interface ICreateTelemechanicsDevice extends ITelemechanicsDevice {
  userId: number
}
