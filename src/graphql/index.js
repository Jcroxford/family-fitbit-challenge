const { makeExecutableSchema } = require('apollo-server-express')
const merge = require('lodash.merge')

const typeDefs = require('./types')
const resolvers = require('./resolvers')

const { DateType, DateTypeResolver } = require('./customScalars/DateType')

module.exports = makeExecutableSchema({
  typeDefs: [...typeDefs, DateType],
  resolvers: merge(resolvers, DateTypeResolver)
})
