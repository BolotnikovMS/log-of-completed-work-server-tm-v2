export interface CreateDistrict {
  userId: number
  name: string
  shortName: string
}

export interface UpdateDistrict {
  name?: string
  shortName?: string
}
