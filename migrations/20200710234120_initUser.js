/** @param {import('knex')} knex */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary()
    table.string('first_name')
    table.timestamps(false, true)
  })
}

/** @param {import('knex')} knex */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
