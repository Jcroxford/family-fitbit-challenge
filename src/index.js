import express from 'express'
import bodyParser from 'body-parser'
import Apollo from 'apollo-server-express'
import passport from 'passport'

import './initDotenv.js'

import FitbitController from './controllers/fitbit.controller.js'

const { ApolloServer, gql } = Apollo

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
