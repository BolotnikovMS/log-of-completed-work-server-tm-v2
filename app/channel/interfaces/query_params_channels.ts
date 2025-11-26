import type { BaseQueryParams } from '#shared/interfaces/query_params'

export interface ChannelQueryParams extends BaseQueryParams {
  substation?: number
  channelType?: number
  channelCategory?: number
}
