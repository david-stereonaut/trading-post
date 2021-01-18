let data = require('./dummyTrades.json')
const mongoose = require('mongoose')
const TradeCard = require('./server/models/TradeCardModel')
const User = require('./server/models/UserModel')
mongoose.connect("mongodb+srv://TradingPostUser:elevation@cluster0.wllqb.mongodb.net/TradingPost?retryWrites=true&w=majority")

const putData = async (arr) => {
  let cards = await TradeCard.find({})
  // let liaSeekingCards = cards.filter(card => (card.user_id == '60045b1519f39a2c9c46c63e' && card.type == 'Seeking')).map(card => card._id)
  // let liaOfferingCards = cards.filter(card => (card.user_id == '60045b1519f39a2c9c46c63e' && card.type == 'Offering')).map(card => card._id)

  // let adamSeekingCards = cards.filter(card => (card.user_id == '6004588a19f39a2c9c46c63d' && card.type == 'Seeking')).map(card => card._id)
  // let adamOfferingCards = cards.filter(card => (card.user_id == '6004588a19f39a2c9c46c63d' && card.type == 'Offering')).map(card => card._id)

  // await User.findByIdAndUpdate('60045b1519f39a2c9c46c63e', {seeking: [...liaSeekingCards], offering: [...liaOfferingCards]})
  // await User.findByIdAndUpdate('6004588a19f39a2c9c46c63d', {seeking: [...adamSeekingCards], offering: [...adamOfferingCards]})

  let user = await User.findById('60045b1519f39a2c9c46c63e').populate('offering').populate('seeking')
  console.log(user)
}

putData()