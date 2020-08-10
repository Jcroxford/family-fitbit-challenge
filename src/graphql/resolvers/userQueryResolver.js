const User = require('../../models').User
const FitbitApi = require('../../services/fitbitApi')

module.exports = {
  Query: {
    users: () => User.query().withGraphFetched('fitbitUser')
  },
  User: {
    fitbitUser: (parent) => FitbitApi.build(parent.fitbitUser)
  }
}
