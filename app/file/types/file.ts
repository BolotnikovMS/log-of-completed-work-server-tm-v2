import type { uploadFileSubstationValidator } from "#file/validators/index"
import type { Infer } from "@vinejs/vine/types"

export type FileSubstation = Infer<typeof uploadFileSubstationValidator> & { userId: number }
