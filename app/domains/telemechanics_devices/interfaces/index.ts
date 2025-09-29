export interface ITelemechanicsDevice {
  substationId: number
  typeKpId: number
  headControllerId: number
  note?: string | null
}

export interface ICreateTelemechanicsDevice extends ITelemechanicsDevice {
  userId: number
}
