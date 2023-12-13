const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')

const mongoURI = process.env.MOGODB_URI

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

mongoose.connect(mongoURI, {}).then(() => console.log('Connected to MongoDB'))

// Auth routes
app.use(authRoutes)

// Use routes
app.use(userRoutes)
app.use(postRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//npx nodemon index.js

// todo: add and set middlewares
