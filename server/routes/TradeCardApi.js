const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const TradeCard = require('../models/TradeCardModel')
const User = require('../models/UserModel')


router.post('/tradecard/:userId', async function (req, res) {
    const {userId} = req.params
    const data = req.body
    const newData = new TradeCard({...data})
    await newData.save()
    let user = await User.findOneAndUpdate({ _id: userId }, { $push: { tradeCards: newData } }, { new: true, useFindAndModify: false }).populate('tradeCards')      
    res.send(user)
})

router.put('/tradecard/:userId', async function (req, res) {
    console.log('trig')
    const {userId} = req.params
    const {tradeCardId, tradeCard} = req.body
    await TradeCard.findOneAndUpdate({ _id: tradeCardId },  tradeCard, function (error, success){
        if (error) {
            console.log(error);
        } else {
            console.log(success)
        }
    })       
    let user = await User.findById(userId).populate('tradeCards')
    res.send(user)
})

router.delete('/tradecard/:userId', async function (req, res) {
    const {userId} = req.params
    const { tradeCardId } = req.body
    await TradeCard.findOneAndDelete({_id: tradeCardId}, function (err, res) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted Trade Card : ", tradeCardId); 
        } 
    });           
    let user = await User.findById(userId).populate('tradeCards')
    res.send(user)
})


module.exports = router