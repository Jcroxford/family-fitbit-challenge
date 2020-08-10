const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    users: [User!]!
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    createdAt: Date!
    updatedAt: Date!
    fitbitUser: FitbitUser!
  }
`
