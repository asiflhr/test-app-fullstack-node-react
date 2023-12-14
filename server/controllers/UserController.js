const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  createUser: async (req, res) => {
    try {
      var { username, password, role } = req.body

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

      // const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(password, 10)
      password = hashedPass

      const newUser = new User({ username, password: hashedPass, role })
      const user = await newUser.save()

      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      ) // secret key and sesssion time
      res.status(200).json({ user, token })
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
    User.findOne({ username: username }).then((user) => {
      //if user not exist than return status 400
      if (!user) return res.status(400).json({ msg: 'User not exist' })

      bcrypt.compare(password, user.password, (err, data) => {
        //if error than throw error
        if (err) throw err

        //if both match than you can do anything
        if (data) {
          const token = jwt.sign(
            { user: { id: user._id, username, role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          )

          return res.status(200).json({ user, token })
        } else {
          return res.status(401).json({ msg: 'Invalid credencial' })
        }
      })
    })
  },
}
