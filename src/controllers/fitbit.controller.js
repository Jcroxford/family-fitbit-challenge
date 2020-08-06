const router = require('express').Router()

const passport = require('passport')
require('../middleware/passport/fitibitStrategy.js')

router.get('/auth', passport.authenticate('fitbit', { scope: ['activity', 'heartrate', 'profile'] }))

router.get('/auth/callback', passport.authenticate('fitbit', {
  successRedirect: '/api/v1/fitbit/auth/success',
  failureRedirect: '/api/v1/fitbit/auth/failure'
}))

router.get('/auth/success', (req, res) => {
  res.json({ success: true, errors: null })
})

router.get('/auth/failure', (req, res) => {
  res.json({ success: false, errors: null })
})

module.exports = router
