/** @param {import('knex')} knex */
exports.up = function (knex) {
  return knex.schema
    .createTable('fitbitUsers', (table) => {
      table.increments().primary()
      table.integer('userId').unsigned()
      table.foreign('userId').references('users.id').onDelete('CASCADE')
      table.string('refreshToken').nullable()
      table.string('accessToken').nullable()
      table.timestamps()

      table.index('id')
      table.index('userId')
    })
    .alterTable('users', (table) => {
      table.index('id')
      table.string('lastName')
      table.unique(['firstName', 'lastName'])
    })
}

/** @param {import('knex')} knex */
exports.down = function (knex) {
  return knex.schema
    .dropTable('fitbitUsers')
    .alterTable('users', (table) => {
      table.dropIndex('id')
      table.dropUnique(['firstName', 'lastName'])
      table.dropColumn('lastName')
    })
}
