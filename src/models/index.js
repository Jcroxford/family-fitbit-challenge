const env = process.env.NODE_ENV || 'development'
const knex = require('knex')(require('../../knexfile')[env])

const { Model } = require('objection')

Model.knex(knex)

const User = require('./User').User
const FitbitUser = require('./FitBitUser')

module.exports = {
  User,
  FitbitUser
}
