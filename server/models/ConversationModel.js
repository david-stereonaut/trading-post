const mongoose = require("mongoose")
const Schema = mongoose.Schema
const conversationSchema = new Schema({
  users : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: String,
  messages: [{ 
    senderId: String,
    message_time: Date,
    body: String,
    tradeCard: { type: Schema.Types.ObjectId, ref: 'TradeCard' }
  }],
  usersReviewed: []
}, { versionKey: false })
const Conversation = mongoose.model("Conversation", conversationSchema)
module.exports = Conversation
