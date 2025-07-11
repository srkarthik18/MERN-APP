const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.user.id).select('-password') // Exclude password
      next()
    } catch (error) {
      console.error('Token verification failed:', error)
      res.status(401).json({ message: 'Not authorized, Invalid token' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' })
  }
}

// MIddeleware to check if the user is an admin
const protectAdmin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' })
  }
}

module.exports = { protect, protectAdmin }
