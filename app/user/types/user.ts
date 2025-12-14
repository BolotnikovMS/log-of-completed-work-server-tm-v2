import type { registerValidator } from '#user/validators/registrer'
import type { Infer } from '@vinejs/vine/types'

export type CreateUser = Infer<typeof registerValidator>

export type ChangeUserPassword = {
  password: string
}

export type BlockUserAccount = {
  active: boolean
}

export type ChangeUserRole = {
  roleId: number
}
