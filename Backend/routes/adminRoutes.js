const express = require('express')
const User = require('../models/User')
const { protect, protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

// @Route GET /api/admin/users
// @Desc Get all users(Admin only)
// @Access Private/Admin
router.get('/', protect, protectAdmin, async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// @Route GET /api/admin/users
// @Desc Add a new user (Admin only)
// @Access Private/Admin
router.post('/', protect, protectAdmin, async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
    user = new User({
      name,
      email,
      password,
      role: role || 'customer' // Default role is 'customer'
    })

    await user.save()
    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// @Route PUT /api/admin/users/:id
// @Desc Update user details (Admin only) - name, email, role
// @Access Private/Admin
router.put('/:id', protect, protectAdmin, async (req, res) => {
  const { name, email, role } = req.body
  const userId = req.params.id

  try {
    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.name = name || user.name
    user.email = email || user.email
    user.role = role || user.role

    await user.save()
    res.status(200).json({ message: 'User updated successfully', user })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
