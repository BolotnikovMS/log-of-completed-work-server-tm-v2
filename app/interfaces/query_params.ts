import { OrderByEnums } from '../enums/sort.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IQueryParams {
  page: number
  size: number
  sort: string
  order: OrderByEnums
  search: string
  active: boolean
  limit: number
}
