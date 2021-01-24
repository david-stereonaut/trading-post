const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const userRouter = require('./server/routes/userApi')
const imageRouter = require('./server/routes/imageApi')
const conversationRouter = require('./server/routes/conversationApi')
const searchRouter = require('./server/routes/searchApi')
const tradeCardRouter = require('./server/routes/tradeCardApi')
const SocketService = require('./server/SocketService/SocketService');
mongoose.connect("mongodb+srv://TradingPostUser:elevation@cluster0.wllqb.mongodb.net/TradingPost?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect("mongodb://localhost/trading-post", { useNewUrlParser: true},  { useUnifiedTopology: true })



app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', userRouter)
app.use('/', imageRouter)
app.use('/', conversationRouter)
app.use('/', searchRouter)
app.use('/', tradeCardRouter)

const socketServer = app.listen(4000);
const cors = {
  cors: [
    {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  ]
}

// ignore this (Eilon)
// const cors = {
//   cors: [
//     {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"]
//     },
//     {
//       origin: "http://localhost:5000",
//       methods: ["GET", "POST"]
//     }
//   ]
// }

const socketService = new SocketService(socketServer, cors);

const port = process.env.PORT || 3001
app.listen(port, function() {
  console.log(`Server running on port ${port}`)
})