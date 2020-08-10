const { gql } = require('apollo-server-express')

module.exports = gql`
  type FitbitUser {
    steps: FitbitSteps!
  }

  type FitbitSteps {
    today: Int!
    sevenDayAverage: Int!
  }
`
