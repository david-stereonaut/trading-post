const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const TradeCard = require('../models/TradeCardModel')
const User = require('../models/UserModel')
router.get('/search/user', async function (req, res) {
    const { lastname, firstname } = req.query
    try {
        const user = await User.find({ $or: [{ lastName: lastname }, { firstName: firstname }] }).populate('offering').populate('seeking')
        res.send(user)
    }
    catch (err) {
        res.send(err.message)
    }
})
router.get('/search/trade', async function (req, res) {
    const { seeking, offering, location } = req.query
    try {
        const users = await User.find({ $and: [{ $or: [{ offeringTags: seeking }, { seekingTags: offering }] }, { "location.country": { $in: location } }] }).populate('offering').populate('seeking').limit(20)
        res.send(users)
    }
    catch (err) {
        res.send(err.message)
    }
})
router.get('/search/perfecttrade', async function (req, res) {
    const { seeking, offering, location } = req.query
    try {
        const users = await User.find({ $and: [{ $and: [{ offeringTags: seeking }, { seekingTags: offering }] }, { "location.country": { $in: location } }] }).populate('offering').populate('seeking').limit(20)
        res.send(users)
    }
    catch (err) {
        res.send(err.message)
    }
})
router.get('/getTags', async function (req, res) {
    const data = await TradeCard.find({})
    const allTags = data.map(t => t.tags)
    let uniqueTagsObject = {}
    for (let i = 0; i < allTags.length; i++) {
        for (let j = 0; j < allTags[i].length; j++) {
            if (!(uniqueTagsObject[allTags[i][j]])) {
                uniqueTagsObject[allTags[i][j]] = "value"
            }
        }
    }
    let uniqueTags = Object.keys(uniqueTagsObject)
    res.send(uniqueTags)
})
router.post('/search/tradeTags', async function (req, res) {
    const { tags } = req.body
    try {
        const tradCards = await TradeCard.find({ "tags": { $in: tags } })
        res.send(tradCards)
    }
    catch (err) {
        res.send(err.message)
    }
})
module.exports = router