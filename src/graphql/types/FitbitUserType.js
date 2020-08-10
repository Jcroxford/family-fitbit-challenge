const { gql } = require('apollo-server-express')

module.exports = gql`
  type FitbitUser {
    steps: FitbitActivityTrackerResponse!
    minutesSedentary: FitbitActivityTrackerResponse!
    minutesLightlyActive: FitbitActivityTrackerResponse!
    minutesFairlyActive: FitbitActivityTrackerResponse!
    minutesVeryActive: FitbitActivityTrackerResponse!
  }

  type FitbitActivityTrackerResponse {
    today: Int!
    sevenDayAverage: Int!
  }
`
