module.exports = {
  FitbitUser: {
    steps: (fitbitApi) => fitbitApi.stepsForLastSevenDays()
  },
  FitbitActivityTrackerResponse: {
    today: (stepsList) => Number(stepsList[stepsList.length - 1].value),
    sevenDayAverage: (stepsList) => Math.round(stepsList.map(({ value }) => Number(value)).reduce((total, value) => total + value, 0) / stepsList.length)
  }
}
