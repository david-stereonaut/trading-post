const mongoose = require("mongoose")
const Schema = mongoose.Schema
const conversationSchema = new Schema({
  user1_id: { type: Schema.Types.ObjectId, ref: 'User' },   
user2_id: { type: Schema.Types.ObjectId, ref: 'User' },   
subject: String,
type: String,
messages: [{ 
  sender_id: String,
  message_time: Date,
  text: String,
  status: String 
  }],
})
const Conversation = mongoose.model("Conversation", conversationSchema)
module.exports = Conversation
