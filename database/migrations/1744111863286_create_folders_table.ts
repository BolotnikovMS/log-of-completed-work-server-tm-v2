import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'folders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('userId', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('users')
      table.integer('parentId', 11)
        .nullable()
      table.string('name', 140)
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
