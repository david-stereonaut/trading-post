const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tradeCardSchema = new Schema({

}, { versionKey: false })

const TradeCard = mongoose.model('TradeCard', tradeCardSchema)
module.exports = TradeCard