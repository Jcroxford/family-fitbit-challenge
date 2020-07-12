const BaseModel = require('./BaseModel')

class User extends BaseModel {
  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['firstName', 'lastName'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
      }
    }
  }
}

module.exports = {
  User
}
