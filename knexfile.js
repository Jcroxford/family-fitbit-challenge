const { knexSnakeCaseMappers } = require('objection')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    ...knexSnakeCaseMappers()
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMappers()
  }
}
