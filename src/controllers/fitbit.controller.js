import express from 'express'

import passport from 'passport'
import '../middleware/passport/fitibitStrategy.js'

const router = express.Router()

router.get('/auth', passport.authenticate('fitbit', { scope: ['activity', 'heartrate', 'location', 'profile'] }))

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

export default router
