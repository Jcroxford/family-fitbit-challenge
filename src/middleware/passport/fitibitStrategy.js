const passport = require('passport')
const FitbitOAuth2Strategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy

const db = require('../../models')

passport.use(new FitbitOAuth2Strategy(
  {
    clientID: process.env.FITBIT_CLIENT_ID,
    clientSecret: process.env.FITBIT_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_ROOT_ADDRESS}/api/v1/fitbit/auth/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('[FITBIT STRATEGY] strating auth strat for fitbit')
    db.User
      .query()
      .findOne({ firstName: profile._json.user.firstName, lastName: profile._json.user.lastName })
      .withGraphFetched('fitbitUser')
      .then(user => {
        if (user) return user

        console.log('[FITBIT STRATEGY] existing user not found. creating new user')
        return db.User.query().insertGraph({
          firstName: profile._json.user.firstName,
          lastName: profile._json.user.lastName,
          fitbitUser: {
            fitbitId: profile.id,
            accessToken,
            refreshToken
          }
        })
      })
      .then(user => done(null, { user }))
      .catch(err => {
        console.log('[FITBIT STRATEGY] strategy failed', err)
        done(err, null)
      })
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})
