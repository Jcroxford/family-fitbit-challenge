module.exports = {
  FitbitUser: {
    steps: (fitbitApi) => fitbitApi.stepsForLastSevenDays(),
    minutesSedentary: (fitibitApi) => fitibitApi.minutesSedentaryForLastSevenDays(),
    minutesLightlyActive: (fitibitApi) => fitibitApi.minutesLightlyActiveForLastSevenDays(),
    minutesFairlyActive: (fitibitApi) => fitibitApi.minutesFairlyActiveForLastSevenDays(),
    minutesVeryActive: (fitibitApi) => fitibitApi.minutesVeryActiveForLastSevenDays()
  },
  FitbitActivityTrackerResponse: {
    today: (stepsList) => Number(stepsList[stepsList.length - 1].value),
    sevenDayAverage: (stepsList) => Math.round(stepsList.map(({ value }) => Number(value)).reduce((total, value) => total + value, 0) / stepsList.length)
  }
}
