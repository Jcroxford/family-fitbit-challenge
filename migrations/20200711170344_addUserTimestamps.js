/** @param {import('knex')} knex */
exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.timestamps(false, true)
  })
}

/** @param {import('knex')} knex */
exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropTimestamps()
  })
}
