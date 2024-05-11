import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id', 11)
        .notNullable()
        .unsigned()
        .index()
        .references('id')
        .inTable('users')
      table
        .integer('substation_id', 11)
        .notNullable()
        .unsigned()
        .index()
        .references('id')
        .inTable('substations')
      table.string('file_path').notNullable()
      table.string('client_name').notNullable()
      table.string('type_file').notNullable()
      table.string('extname')
      table.integer('size')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
