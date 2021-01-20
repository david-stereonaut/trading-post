const mongoose = require("mongoose")
const Schema = mongoose.Schema
const tradeCardSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },   
    type: String, 
    title: String,
    subTitle: String,
    description: String,
    tags: [],
    thumbnail: {
        imageUrl: String,
        imageId: String
    }
}, { versionKey: false })
const TradeCard = mongoose.model("TradeCard", tradeCardSchema)

module.exports = TradeCard
