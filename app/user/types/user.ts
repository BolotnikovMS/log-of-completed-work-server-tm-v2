import type { blockUserAccountValidator, changePasswordValidator, changeUserRole, registerValidator } from '#user/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateUser = Infer<typeof registerValidator>

export type ChangeUserPassword = Infer<typeof changePasswordValidator>

export type BlockUserAccount = Infer<typeof blockUserAccountValidator>

export type ChangeUserRole = Infer<typeof changeUserRole>
