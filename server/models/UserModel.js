const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String,
    profilePic: String,
    description: String,
    images: [],
    firstName: String,
    lastName: String,
    location: {
        country: String,
        city: String,
        street: String
    },
    offeringTags: [],
    seekingTags: [],
    offering: [{ type: Schema.Types.ObjectId, ref: 'TradeCard' }], 
    seeking : [{ type: Schema.Types.ObjectId, ref: 'TradeCard' }], 
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    content: [],
    reviews: [],
}, { versionKey: false })

const User = mongoose.model("User", userSchema)

module.exports = User
