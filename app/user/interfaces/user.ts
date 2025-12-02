export interface CreateUser {
  roleId: number
  username: string
  surname: string
  name: string
  patronymic: string
  position: string
  email: string
  password: string
}

export interface ChangeUserPassword {
  password: string
}

export interface BlockUserAccount {
  active: boolean
}

export interface ChangeUserRole {
  roleId: number
}
