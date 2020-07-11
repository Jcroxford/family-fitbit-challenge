const env = process.env.NODE_ENV || 'development'
const knex = require('knex')(require('../../knexfile')[env])

const { Model } = require('objection')

Model.knex(knex)

const User = require('./User').User

module.exports = {
  User
}
