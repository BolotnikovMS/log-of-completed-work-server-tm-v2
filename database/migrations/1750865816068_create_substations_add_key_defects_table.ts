import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'substations'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('key_defect_substation', 11).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('key_defect_substation')
    })
  }
}
