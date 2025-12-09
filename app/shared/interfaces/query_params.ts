import { OrderByEnums } from '#shared/enums/sort'

export interface BaseQueryParams {
  page?: number
  limit?: number
  search?: string
  sort?: string
  order?: OrderByEnums
}
