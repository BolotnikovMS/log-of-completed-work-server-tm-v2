import type { fileSubstationKeyValidator, uploadFileSubstationValidator } from '#file/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type FileSubstation = Infer<typeof uploadFileSubstationValidator> & { userId: number }

export type FileSubstationKey = Infer<typeof fileSubstationKeyValidator>

export type UpdFileName = {
  clientName: string
}
