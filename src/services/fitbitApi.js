const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

class FitbitApi {
  constructor () {}

  static async build (fitbitUser) {
    const nowInSecondsWithBuffer = Math.floor(Date.now() / 1000)
    // buffer is to account for time to make network requests. Expire token 30 seconds early just in case
    const timeAccessTokenExpires = jwt.decode(fitbitUser.accessToken).exp - 30

    if (nowInSecondsWithBuffer > timeAccessTokenExpires) {
      try {
        console.log('[FitbitApi] updating access token')
        const updatedTokens = await this.refreshAccessToken(fitbitUser.refreshToken)

        fitbitUser = await db.FitbitUser.query().patchAndFetchById(fitbitUser.id, updatedTokens)
      } catch (error) {
        console.log(`[FitbitApi] failed to update token ${error}`)
      }
    }

    return new FitbitApi(fitbitUser)
  }

  static async refreshAccessToken (refreshToken) {
    const base64FitbitServerAuth = Buffer.from(`${process.env.FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`).toString('base64')

    return fetch('https://api.fitbit.com/oauth2/token', {
      method: 'post',
      headers: {
        Authorization: `Basic ${base64FitbitServerAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    })
      .then(res => res.json())
      .then(({ access_token: accessToken, refresh_token: refreshToken }) => ({ refreshToken, accessToken }))
      .catch(err => console.log('[FitbitApi] error occured while refreshing access token', err))
  }

  async makeRequest ({ url, method = 'get' }) {
    return fetch(`https://api.fitbit.com/1${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
      .then(res => res.json())
      .catch(err => console.log(`[FitbitApi] error occured while making request to ${url}`, err))
  }

  async steps () {
    return this.makeRequest({ url: `/user/${this.fitbitUserId}/activities/tracker/steps/date/today/7d.json` })
  }

  async minutesSedentary () {
    return this.makeRequest({ url: `/user/${this.fitbitUserId}/activities/tracker/minutesSedentary/date/today/7d.json` })
  }

  async minutesLightlyActive () {
    return this.makeRequest({ url: `/user/${this.fitbitUserId}/activities/tracker/minutesLightlyActive/date/today/7d.json` })
  }

  async minutesFairlyActive () {
    return this.makeRequest({ url: `/user/${this.fitbitUserId}/activities/tracker/minutesFairlyActive/date/today/7d.json` })
  }

  async minutesVeryActive () {
    return this.makeRequest({ url: `/user/${this.fitbitUserId}/activities/tracker/minutesVeryActive/date/today/7d.json` })
  }
}

module.exports = FitbitApi
