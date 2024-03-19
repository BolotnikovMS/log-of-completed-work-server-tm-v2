import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'

import { withAuthFinder } from '@adonisjs/auth'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Role from './role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roleId: number

  @column()
  declare active: boolean

  @column()
  declare username: string

  @column()
  declare surname: string

  @column()
  declare name: string

  @column()
  declare patronymic: string

  @column()
  declare position: string

  @column()
  declare email: string

  @column({
    serializeAs: null,
  })
  declare password: string

  @computed()
  get fullName() {
    return `${this.surname} ${this.name} ${this.patronymic}`
  }

  @computed()
  get shortName() {
    return `${this.surname} ${this.name.at(0)}.${this.patronymic.at(0)}.`
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
