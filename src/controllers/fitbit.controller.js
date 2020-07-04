import express from 'express'

const router = express.Router()

router.post('/webhook', (req, res) => {
  console.log(req.body)
})

export default router
