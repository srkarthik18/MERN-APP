const express = require('express')
const Order = require('../models/Order')
const { protect, protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

// @Route GET /api/admin/orders
// @Desc Get all orders (Admin only)
// @Access Private/Admin
router.get('/', protect, protectAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email')
    res.status(200).json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// @Route PUT /api/admin/orders/:id
// @Desc Update order status (Admin only)
// @Access Private/Admin
router.put('/:id', protect, protectAdmin, async (req, res) => {
  const orderId = req.params.id
  const { status } = req.body

  try {
    let order = await Order.findById(orderId).populate('user', 'name')

    if (order) {
      order.status = status || order.status // Update status if provided
      order.isDelivered = status === 'Delivered' ? true : order.isDelivered // Set isDelivered if status is 'delivered'
      order.deliveredAt =
        status === 'Delivered' ? Date.now() : order.deliveredAt // Set deliveredAt if status is 'delivered'

      const updatedOrder = await order.save()
      res.status(200).json(updatedOrder)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    console.error('Error updating order:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// @Route DELETE /api/admin/orders/:id
// @Desc Delete an order (Admin only)
// // @Access Private/Admin
router.delete('/:id', protect, protectAdmin, async (req, res) => {
  const orderId = req.params.id

  try {
    const order = await Order.findById(orderId)

    if (order) {
      await order.deleteOne()
      res.status(200).json({ message: 'Order deleted successfully' })
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    console.error('Error deleting order:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
