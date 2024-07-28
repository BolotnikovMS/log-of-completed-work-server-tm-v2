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
  substation: string
  cleanUser: string
  dateStart: string
  dateEnd: string
  executor: string
}
