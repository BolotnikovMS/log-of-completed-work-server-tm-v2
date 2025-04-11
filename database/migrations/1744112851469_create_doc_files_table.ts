import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'doc_files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('userId', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('users')
      table.integer('folderId', 11)
        .nullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('folders')
      table.string('file_path').notNullable()
      table.string('client_name').notNullable()
      table.string('extname')
      table.string('type_file').notNullable()
      table.integer('size')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
