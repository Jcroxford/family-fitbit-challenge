const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const passport = require('passport')

require('./initDotenv.js')

const FitbitController = require('./controllers/fitbit.controller.js')

const apolloSchema = require('./graphql')
const server = new ApolloServer({ schema: apolloSchema })

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
server.applyMiddleware({ app })

// add routes
app.use('/api/v1/fitbit', FitbitController)

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
)
