const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new Schema({

}, { versionKey: false })

const Conversation = mongoose.model('Conversation', conversationSchema)
module.exports = Conversation