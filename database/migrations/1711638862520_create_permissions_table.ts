import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('access', 255).notNullable()
      table.text('description').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          access: 'viewingDistricts',
          description: 'Просмотр РЭС, ГП',
        },
        {
          access: 'createDistrict',
          description: 'Добавление РЭС, ГП',
        },
        {
          access: 'editingDistrict',
          description: 'Редактирование района',
        },
        {
          access: 'deletingDistrict',
          description: 'Удаление района',
        },
        {
          access: 'viewingSubstations',
          description: 'Просмотр ПС',
        },
        {
          access: 'viewingSubstations',
          description: 'Просмотр ПС',
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
