export interface CreateHeadController {
  userId: number
  name: string
  actualFirmwareVersion?: string | null
}

export interface UpdateHeadController {
  name?: string
  actualFirmwareVersion?: string | null
}
