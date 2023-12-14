// models/User.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'user' }, // default role is 'user'
})

module.exports = mongoose.model('User', userSchema)
