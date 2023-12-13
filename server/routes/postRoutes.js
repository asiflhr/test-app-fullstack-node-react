const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/posts', authMiddleware.isAuthenticated, PostController.createPost)
router.get('/posts', authMiddleware.isAuthenticated, PostController.getAllPosts)
router.get(
  '/posts/:id',
  authMiddleware.isAuthenticated,
  PostController.getPostById
)
router.put(
  '/posts/:id',
  authMiddleware.isAuthenticated,
  PostController.updatePost
)
router.delete(
  '/posts/:id',
  authMiddleware.isAuthenticated,
  PostController.deletePost
)

module.exports = router
