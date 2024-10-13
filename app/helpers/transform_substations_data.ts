import Channel from "#models/channel"
import { ModelObject } from "@adonisjs/lucid/types/model"

export interface ITransformedChannelData {
  channelCategory: string
  channelType: string
  ipAddress: string | null
  gsm: string | null
}

export interface ITransformedSubstationData {
  [key: string]: string | null | ITransformedChannelData[]
  district: string
  fullNameSubstation: string
  rdu: string | null
  typeKp: string
  headController: string
  channels: ITransformedChannelData[] | null
}

export const transformDataSubstations = (data: ModelObject[]): ITransformedSubstationData[] => {
  return data.map(substation => ({
    district: substation.district.name,
    fullNameSubstation: substation.fullNameSubstation,
    rdu: substation.rdu,
    typeKp: substation.type_kp.name ?? 'Не указан',
    headController: substation.head_controller.name ?? 'Не указан',
    channels: substation?.channels.length ? substation.channels.map((channel: Channel) => ({
      channelCategory: channel.channel_category.name,
      channelType: channel.channel_type.name,
      ipAddress: channel.ipAddress ?? 'Нет',
      gsm: channel?.gsm_operator?.name ?? 'Нет'
    })) : null
  }))
}
