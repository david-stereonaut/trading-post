const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const router = require('./server/routes/userApi')
// mongoose.connect("mongodb+srv://TradingPostUser:elevation@cluster0.wllqb.mongodb.net/TradingPost?retryWrites=true&w=majority")
mongoose.connect("mongodb://localhost/trading-post", { useNewUrlParser: true},  { useUnifiedTopology: true })



app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

const port = process.env.PORT || 3001
app.listen(port, function() {
  console.log(`Server running on port ${port}`)
})

