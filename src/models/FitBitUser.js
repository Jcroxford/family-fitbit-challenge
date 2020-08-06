const BaseModel = require('./BaseModel')

class FitbitUser extends BaseModel {
  static get tableName () {
    return 'fitbit_users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['fitbitId', 'userId'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        fitbitId: { type: 'string' },
        refreshToken: { type: 'string' },
        accessToken: { type: 'string' }
      }
    }
  }
}

module.exports = FitbitUser
