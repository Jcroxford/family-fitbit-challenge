const { gql } = require('apollo-server-express')

const QueryType = gql`
  type Query {
    hello: String!
  }
`

module.exports = [
  QueryType,
  require('./UserType'),
  require('./FitbitUserType')
]
