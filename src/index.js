const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, gql } = require('apollo-server-express')
const passport = require('passport')

require('./initDotenv.js')

const FitbitController = require('./controllers/fitbit.controller.js')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
server.applyMiddleware({ app })

// add routes
app.use('/api/v1/fitbit', FitbitController)

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
)
