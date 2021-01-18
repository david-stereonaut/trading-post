const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const TradeCard = require('../models/TradeCardModel')
const User = require('../models/UserModel')

router.get('/myuser/:userId', async function (req, res) {
    const { userId } = req.params
    const data = await User.findById(userId).populate('offering').populate('seeking')
    console.log(data)
    let { _id, email, firstName, lastName, location, offeringTags, seekingTags, offering, seeking, conversations, content, reviews, profilePic, images, description } = data
    const newData = {
        _id,
        email,
        firstName,
        lastName,
        location,
        offeringTags,
        seekingTags,
        offering,
        seeking,
        conversations,
        content,
        reviews,
        profilePic,
        images,
        description
    }
    res.send(newData)
})

router.get('/user/:userId', async function (req, res) {
    const { userId } = req.params
    const data = await User.findById(userId).populate('offering').populate('seeking')
    let { _id, email, firstName, lastName, location, offeringTags, seekingTags, offering, seeking, content, reviews, profilePic, images, description } = data
    const newData = {
        _id,
        email,
        firstName,
        lastName,
        location,
        offeringTags,
        seekingTags,
        offering,
        seeking,
        content,
        reviews,
        profilePic,
        images,
        description
    }
    res.send(newData)
})

router.post('/user', async function (req, res) {
    let data = req.body
    try {
        const userUploaded = new User({ ...data })
        await userUploaded.save()
        res.send(userUploaded)
    }
    catch (err) {
        res.send(err.message)
    }
})

// router.post('/tradecard', function (req, res) {
//    let data = req.body
//    const newData = new TradeCard({...data})
//     newData.save()
//         .then(response => {
//             console.log('add tradecard')
//         })
//     res.send("1")
// })


// router.post('/conversation', function (req, res) {
//     let data = req.body
//    const newData = new Conversation({...data})
//     newData.save()
//         .then(response => {
//             console.log('add conversation')
//         })
//     res.send("1")
// })


router.put('/addToUserArray/:userId',async function (req, res) {
    let { keyName, value } = req.body
    let { userId } = req.params
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $push: { [keyName]: value } }, { new: true })
        res.send(updatedUser)
    }
    catch (err) {
        res.send(err.message)
    }
})

router.put('/removeFromUserArray/:userId',async function (req, res) {
    let { keyName, value } = req.body
    let { userId } = req.params
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $pull: { [keyName]: value } }, { new: true })
        res.send(updatedUser)
    }
    catch (err) {
        res.send(err.message)
    }
})

router.put('/updateUserDetails/:userId', async function (req, res) {
    const { keyName, value } = req.body
    const { userId } = req.params
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: { [keyName]: value } }, { new: true })
        res.send(updatedUser)
    }
    catch (err) {
        res.send(err.message)
    }
})

module.exports = router