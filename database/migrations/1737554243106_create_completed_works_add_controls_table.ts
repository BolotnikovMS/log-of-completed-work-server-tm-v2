import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'completed_works'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('in_control').defaultTo(false)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('in_control')
    })
  }
}
