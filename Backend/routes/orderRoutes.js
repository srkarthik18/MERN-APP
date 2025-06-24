const express = require('express')
const Order = require('../models/Order')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// @Route GET /api/orders/my-orders
// @Desc Get all orders for the logged-in user
// @Access Private
router.get('/my-orders', protect, async (req, res) => {
  try {
    //   find orders for the authenticated user
    //   using req.user._id which is set by the protect middleware
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1
    }) // sort by most recent first
    res.status(200).json(orders)
  } catch (error) {
    console.error('Error fetching user orders:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @Route GET /api/orders/:id
// @Desc Get order details by ID
// @Access Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    ) // Populate user details

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // // Check if the order belongs to the authenticated user
    // if (order.user.toString() !== req.user._id.toString()) {
    //   return res
    //     .status(403)
    //     .json({ message: 'Not authorized to access this order' })
    // }

    res.status(200).json(order)
  } catch (error) {
    console.error('Error fetching order details:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
