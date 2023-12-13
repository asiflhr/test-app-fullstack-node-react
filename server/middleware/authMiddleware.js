// middleware/authMiddleware.js
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

module.exports = {
  isAuthenticated: async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    try {
      const decoded = jwt.verify(token, 'your-secret-key')
      req.user = decoded.user
      next()
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' })
    }
  },
  isAdmin: async (req, res, next) => {
    // Implement logic to check if the user is an admin
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Forbidden' })
    next()
  },
}
