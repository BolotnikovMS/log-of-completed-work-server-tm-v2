import type { createClosesDefect } from '#defect/validators/create_closes_defect'
import type { createDefect } from '#defect/validators/create_defect'
import type { queryParamsDefectValidator } from '#defect/validators/query_params_defect'
import type { updateDefect } from '#defect/validators/update_defect'
import type { Infer } from '@vinejs/vine/types'

export enum DefectCategory {
  defect = 'Дефект',
  remark = 'Замечание',
  other = 'Прочее'
}

export enum DefectStatus {
  open = 'Открыт',
  close = 'Закрыт'
}

export type CreateDefect = Infer<typeof createDefect> & { userId: number }
export type UpdateDefect = Infer<typeof updateDefect> & { userId: number }
export type CreateClosesDefect = Infer<typeof createClosesDefect> & { userId: number, status: DefectStatus.close }
export type QueryParamsDefect = Infer<typeof queryParamsDefectValidator>
