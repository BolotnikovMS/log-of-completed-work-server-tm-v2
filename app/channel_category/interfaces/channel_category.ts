export interface CreateChannelCategory {
  userId: number
  name: string
  shortName: string
}

export interface UpdateChannelCategory {
  name?: string
  shortName?: string
}
