const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

}, { versionKey: false })

const User = mongoose.model('User', userSchema)
module.exports = User