const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const TradeCard = require('../models/TradeCardModel')
const User = require('../models/UserModel')


//imperfecttrade?seeking=Synth,Dog Sitting&offering=Languages
router.get('/search/imperfecttrade', async function (req, res) {
    const { seeking, offering } = req.query
    const newOffering = offering ? offering.split(',') : null
    const newSeeking = seeking ? seeking.split(',') : null
    try {
        let users = await User.find({$or:[{offeringTags: {$in: newOffering }},{seekingTags:{$in:newSeeking}}]}, { firstName: 1, lastName: 1, profilePic: 1, seekingTags: 1, offeringTags: 1, description: 1, location: 1 })
        res.send(users)
    }
    catch (err) {
        res.send(err)
    }
})
router.get('/search/perfecttrade', async function (req, res) {
    const { seeking, offering } = req.query
    const newOffering = offering ? offering.split(',') : null
    const newSeeking = seeking ? seeking.split(',') : null
    try {
    let users = await User.find({$and:[{offeringTags: {$in: newOffering }},{seekingTags:{$in:newSeeking}}]}, { firstName: 1, lastName: 1, profilePic: 1, seekingTags: 1, offeringTags: 1, description: 1, location: 1 })
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

router.get('/autocomplete/users', async function (req, res) {
    const { text } = req.query
    try {
        const re = new RegExp(`.*${text}.*`, 'i')
        const users = await User.find({ firstName: { $regex: re } }, { profilePic: 1, firstName: 1, lastName: 1 })
        res.send(users)
    }
    catch (err) {
        res.status(401).send(err.message)
    }
})

router.get('/search/trades', async function (req, res) {
    const { q } = req.query
    try {
        const re = new RegExp(`.*${q}.*`, 'i')
        const trades = await TradeCard.find({ description: { $regex: re } }).populate([
            {
                path: 'user_id',
                select: 'firstName lastName profilePic seekingTags offeringTags location'
            }
        ])
        res.send(trades)
    }
    catch (err) {
        res.status(401).send(err.message)
    }
})

router.get('/search/users', async function (req, res) {
    const { q, firstName, lastName } = req.query
    try {
        if (q) {
            const re = new RegExp(`.*${q}.*`, 'i')
            const users = await User.find({ $or: [{ firstName: { $regex: re } }, { lastName: { $regex: re } }]}, { firstName: 1, lastName: 1, profilePic: 1, seekingTags: 1, offeringTags: 1, description: 1, location: 1 })
            res.send(users)
        } else {
            const firstRe = new RegExp(`.*${firstName}.*`, 'i')
            const lastRe = new RegExp(`.*${lastName}.*`, 'i')
            const users = await User.find({  firstName: { $regex: firstRe }, lastName: { $regex: lastRe } }, { firstName: 1, lastName: 1, profilePic: 1, seekingTags: 1, offeringTags: 1, description: 1, location: 1 })
            res.send(users)
        }
    }
    catch (err) {
        res.status(401).send(err.message)
    }
})



// router.get('/search/user', async function (req, res) {
//     const { lastname, firstname } = req.query
//     try {
//         const user = await User.find({ $or: [{ lastName: lastname }, { firstName: firstname }] }).populate('offering').populate('seeking')
//         res.send(user)
//     }
//     catch (err) {
//         res.send(err.message)
//     }
// })

// router.post('/search/tradeTags', async function (req, res) {
//     const { tags } = req.body
//     try {
//         const tradCards = await TradeCard.find({ "tags": { $in: tags } })
//         res.send(tradCards)
//     }
//     catch (err) {
//         res.send(err.message)
//     }
// })

// router.get('/search/userbylocation', async function (req, res) {
//     const { lastname, firstname, city, country } = req.query
//     try {
//         const user = await User.find({ $and: [{ lastName: lastname }, { firstName: firstname }, { city: city }, { country: country }] }).populate('offering').populate('seeking')
//         res.send(user)
//     }
//     catch (err) {
//         res.send(err.message)
//     }
// })

module.exports = router