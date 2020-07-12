const User = require('../../models').User

module.exports = {
  Query: {
    users: () => User.query()
  }
}
