const { Model } = require('objection')
const BaseModel = require('./BaseModel')

class User extends BaseModel {
  static get tableName () {
    return 'users'
  }

  static get relationMappings () {
    const FitibitUser = require('./FitBitUser')

    return {
      fitbitUser: {
        relation: Model.HasOneRelation,
        modelClass: FitibitUser,
        join: {
          from: 'users.id',
          to: 'fitbit_users.userId'
        }
      }
    }
  }

  static get jsonSchema () {
    const FitibitUser = require('./FitBitUser')

    return {
      type: 'object',
      required: ['firstName', 'lastName'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        fitbitUser: FitibitUser.jsonSchema
      }
    }
  }
}

module.exports = User
