const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const TradeCard = require('../models/TradeCardModel')
const User = require('../models/UserModel')


router.post('/tradecard/:userId', async function (req, res) {
    const {userId} = req.params
    const {data} = req.body
    const newData = new TradeCard({...data})
    await newData.save()
            .then(response => {
                console.log('add tradecard')
            })
                   
            res.send(newData)
})

router.put('/tradecard/:tradeCardId', async function (req, res) {
    const {tradeCardId} = req.params
    TradeCard.findOneAndUpdate({ _id: tradeCardId },  {$set: req.body}, function (error, success){
        if (error) {
            console.log(error);
        } else {
            console.log(success)
        }
    })       
    res.send("1")
})

router.delete('/tradeCards/:tradeCardId', async function (req, res) {
    const {tradeCardId} = req.params
    TradeCard.findOneAndDelete({_id: tradeCardId}, function (err, res) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted Trade Card : ", tradeCardId); 
        } 
    });           
        res.send("deleted trade card")
})


module.exports = router