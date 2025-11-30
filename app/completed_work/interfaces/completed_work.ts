
export interface CreateCompletedWork {
  userId: number
  substationId: number
  workProducerId: number
  typeWorkId: number
  description: string
  note?: string | null
  dateCompletion: string
  inControl?: boolean
}

export interface UpdateCompletedWork {
  substationId?: number
  workProducerId?: number
  typeWorkId?: number
  description?: string
  note?: string | null
  dateCompletion?: string
  inControl?: boolean
}
