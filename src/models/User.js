const { Model } = require('objection')

class User extends Model {
  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string' }
      }
    }
  }
}

module.exports = {
  User
}
