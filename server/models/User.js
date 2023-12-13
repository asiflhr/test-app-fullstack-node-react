// models/User.js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'user' }, // default role is 'user'
})

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(user.password, salt)
  user.password = hashedPassword
  next()
})

// Compare hashed passwords during authentication
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
