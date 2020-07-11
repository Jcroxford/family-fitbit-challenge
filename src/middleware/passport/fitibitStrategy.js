const passport = require('passport')
const FitbitOAuth2Strategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy

passport.use(new FitbitOAuth2Strategy(
  {
    clientID: process.env.FITBIT_CLIENT_ID,
    clientSecret: process.env.FITBIT_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_ROOT_ADDRESS}/api/v1/fitbit/auth/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken: ', accessToken)
    console.log('refreshToken: ', refreshToken)
    console.log('profile: ', profile)

    done(null, { messages: [] })
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})
