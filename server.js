const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const api = require('./server/routes/api')
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

const port = process.env.PORT || 3001
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trading-post", { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true })
app.listen(port, function() {
  console.log(`Server running on port ${port}`)
})