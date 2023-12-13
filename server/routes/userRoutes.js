// routes/userRoutes.js
const express = require('express')

const router = express.Router()
const UserController = require('../controllers/UserController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/users', UserController.createUser)
router.get('/users', UserController.getAllUsers)
// router.post('/users', authMiddleware.isAdmin, UserController.createUser)
// router.get('/users', authMiddleware.isAdmin, UserController.getAllUsers)
router.get(
  '/users/:id',
  authMiddleware.isAuthenticated,
  UserController.getUserById
)
router.put(
  '/users/:id',
  authMiddleware.isAuthenticated,
  UserController.updateUser
)
router.delete('/users/:id', authMiddleware.isAdmin, UserController.deleteUser)

module.exports = router
