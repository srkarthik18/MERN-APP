const express = require('express')
const Product = require('../models/Product')
const { protect, protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

// @Route GET /api/admin/products
// @Desc Get all products (Admin only)
// @Access Private/Admin
router.get('/', protect, protectAdmin, async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
