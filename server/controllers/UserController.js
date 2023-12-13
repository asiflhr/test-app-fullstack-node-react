const User = require('../models/User.js')

module.exports = {
  createUser: async (req, res) => {
    try {
      const { username, password, role } = req.body

      // Validate if required fields are present
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: 'Username and password are required.' })
      }

      // Check if the username already exists
      const existingUser = await User.findOne({ username })
      if (existingUser) {
        return res.status(400).json({
          error: 'Username already exists. Please choose a different one.',
        })
      }

      const user = new User({ username, password, role })
      await user.save()

      res.status(201).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id

      // Validate if userId is a valid ObjectId
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid user ID.' })
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found.' })
      }

      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id
      const { username, password, role } = req.body

      // Validate if userId is a valid ObjectId
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid user ID.' })
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found.' })
      }

      // Update user fields
      user.username = username || user.username
      user.password = password || user.password
      user.role = role || user.role

      await user.save()

      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id

      // Validate if userId is a valid ObjectId
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid user ID.' })
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found.' })
      }

      await user.remove()

      res.status(204).json({ message: 'User deleted successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body

    try {
      const user = await User.findOne({ username })

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const isPasswordMatch = await user.comparePassword(password)

      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const token = jwt.sign(
        { user: { id: user._id, role: user.role } },
        'your-secret-key',
        {
          expiresIn: '1h',
        }
      )

      res.json({ token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },
}
