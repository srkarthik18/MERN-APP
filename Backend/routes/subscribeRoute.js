const express = require('express')
const Subscriber = require('../models/Subscriber')

const router = express.Router()

//@Route POST /api/subscriber - Create a new subscriber
// @desc Create a new subscribtion for newsletter
// @access Public

router.post('/subscribe', async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    let subscriber = await Subscriber.findOne({ email })
    if (subscriber) {
      return res.status(400).json({ message: 'Email is already subscribed' })
    }

    subscriber = new Subscriber({ email })
    await subscriber.save()

    res
      .status(201)
      .json({ message: 'Successfully subscribed to the newsletter' })
  } catch (error) {
    console.error('Error subscribing email:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
