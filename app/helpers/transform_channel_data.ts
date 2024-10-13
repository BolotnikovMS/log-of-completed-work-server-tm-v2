import { ModelObject } from "@adonisjs/lucid/types/model"

export interface ITransformedChannelsData {
  [key: string]: string | null
  fullNameSubstation: string
  channelCategory: string
  channelType: string
  channelEquipment: string | null
  gsmOperator: string | null
  ipAddress: string | null
  note: string | null
}

export const transformDataChannels = (data: ModelObject[]): ITransformedChannelsData[] => {
  return data.map(channel => ({
    fullNameSubstation: channel?.substation.fullNameSubstation ?? 'Нет',
    channelCategory: channel?.channel_category.name ?? 'Нет',
    channelType: channel?.channel_type.name ?? 'Нет',
    channelEquipment: channel?.channel_equipment?.name ?? 'Нет',
    gsmOperator: channel?.gsm_operator?.name ?? 'Нет',
    ipAddress: channel.ipAddress ?? 'Нет',
    note: channel.note ?? 'Нет'
  }))
}
