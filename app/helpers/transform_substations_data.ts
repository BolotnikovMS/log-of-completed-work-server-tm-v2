import { ModelObject } from "@adonisjs/lucid/types/model"

export interface ITransformedSubstationData {
  [key: string]: string | null
  district: string
  fullNameSubstation: string
  rdu: string | null
  typeKp: string | null
  headController: string | null
  mainChannel: string | null
  backupChannel: string | null
  additionalChannel: string | null
  mainChannelIp: string | null
  backupChannelIp: string | null
  gsm: string | null
}

export const transformDataSubstations = (data: ModelObject[]): ITransformedSubstationData[] => {
  return data.map(substation => ({
    district: substation.district.name,
    fullNameSubstation: substation.fullNameSubstation,
    rdu: substation.rdu,
    typeKp: substation.type_kp ? substation.type_kp.name : 'Не указан',
    headController: substation.head_controller ? substation.head_controller.name : 'Не указан',
    mainChannel: substation.main_channel ? substation.main_channel.name : 'Не указан',
    backupChannel: substation.backup_channel ? substation.backup_channel.name : 'Не указан',
    additionalChannel: substation.additional_channel ? substation.additional_channel.name : 'Не указан',
    mainChannelIp: substation.mainChannelIp,
    backupChannelIp: substation.backupChannelIp,
    gsm: substation.gsm ? substation.gsm.name : 'Не указан',
  }))
}
