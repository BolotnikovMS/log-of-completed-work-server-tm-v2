import { OrderByEnums } from '../enums/sort.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IQueryParams {
  page: number
  size: number
  sort: string
  order: OrderByEnums
  search: string
  active: string
  limit: number
  offset: number
  substation: string
  cleanUser: string
  dateStart: string
  dateEnd: string
  executor: string
  typeKp: string
  headController: string
  district: string
  channelType: string
  channelCategory: string
  typeWork: string
  inControl: string
}
