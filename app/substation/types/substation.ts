import type { createSubstationValidator, substationKeyDefectValidator, substationNoteValidator, updateSubstationValidator } from '#substation/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateSubstation = Infer<typeof createSubstationValidator> & { userId: number, nameSearch: string }

export type UpdateSubstation = Infer<typeof updateSubstationValidator> & { nameSearch?: string }

export type UpdateNoteSubstation = Infer<typeof substationNoteValidator>

export type KeyDefectSubstation = Infer<typeof substationKeyDefectValidator>
