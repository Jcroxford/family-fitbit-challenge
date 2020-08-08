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
  }
}

module.exports = FitbitApi
