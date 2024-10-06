import { ModelObject } from "@adonisjs/lucid/types/model"

export interface ITransformedChannelsData {
  [key: string]: string | null
  fullNameSubstation: string
  channelCategory: string
  channelType: string
  ipAddress: string | null
  note: string | null
}

export const transformDataChannels = (data: ModelObject[]): ITransformedChannelsData[] => {
  return data.map(channel => ({
    fullNameSubstation: channel?.substation?.fullNameSubstation ?? 'Нет',
    channelCategory: channel?.channel_category.name ?? 'Нет',
    channelType: channel?.channel_type.name ?? 'Нет',
    ipAddress: channel.ipAddress ?? 'Нет',
    note: channel.note ?? 'Нет'
  }))
}
