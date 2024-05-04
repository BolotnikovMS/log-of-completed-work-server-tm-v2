import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'substations'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name_search', 250)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name_search')
    })
  }
}
