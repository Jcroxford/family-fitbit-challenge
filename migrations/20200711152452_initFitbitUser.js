/** @param {import('knex')} knex */
exports.up = function (knex) {
  return knex.schema
    .createTable('fitbitUsers', (table) => {
      table.increments().primary()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.string('refresh_token').nullable()
      table.string('access_token').nullable()
      table.string('fitbit_id').notNullable()
      table.timestamps(false, true)

      table.index('id')
      table.index('user_id')
    })
    .alterTable('users', (table) => {
      table.index('id')
      table.string('last_name')
      table.unique(['first_name', 'last_name'])
    })
}

/** @param {import('knex')} knex */
exports.down = function (knex) {
  return knex.schema
    .dropTable('fitbitUsers')
    .alterTable('users', (table) => {
      table.dropIndex('id')
      table.dropUnique(['first_name', 'last_name'])
      table.dropColumn('last_name')
    })
}
