const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String,
    profilePic: {
        imageUrl: String,
        imageId: String
    },
    description: String,
    images: [{
        imageUrl: String,
        imageId: String
    }],
    firstName: String,
    lastName: String,
    location: {
        country: String,
        city: String,
        lat: Number,
        lng: Number
    },
    offeringTags: [],
    seekingTags: [],
    tradeCards: [{ type: Schema.Types.ObjectId, ref: 'TradeCard' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    content: [],
    reviews: [],
    neighbors: [{ type: Schema.Types.ObjectId, ref : 'User' }]
}, { versionKey: false })

const User = mongoose.model("User", userSchema)

module.exports = User
