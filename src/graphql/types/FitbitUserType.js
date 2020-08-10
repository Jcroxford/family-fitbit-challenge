const { gql } = require('apollo-server-express')

module.exports = gql`
  type FitbitUser {
    steps: FitbitActivityTrackerResponse!
  }

  type FitbitActivityTrackerResponse {
    today: Int!
    sevenDayAverage: Int!
  }
`
