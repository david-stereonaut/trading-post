const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const TradeCard = require('../models/TradeCardModel')
const User = require('../models/UserModel')

router.get('/myuser/:userId', async function (req, res) {
    const {userId} = req.params
    const data = await User.findById(userId).populate('offering').populate('seeking')
    console.log(data)
        let {_id, email,firstName,lastName,location,offeringTags,seekingTags,offering,seeking,conversations,content,reviews,profilePic, images, description} = data
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
    const {userId} = req.params
    const data = await User.findById(userId).populate('offering').populate('seeking')
        let {_id, email,firstName,lastName,location,offeringTags,seekingTags, offering, seeking, content,reviews,profilePic,images, description} = data
            const newData ={
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
    
    router.post('/user', function (req, res) {
       let data = req.body
       const newData = new User({...data})
        newData.save()
            .then(response => {
                console.log('add user')
            })
        res.send("1")
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

  
   router.put('/addToUserArray/:userId', function (req, res) {
    let {keyName, value} = req.body 
    let {userId} = req.params
        User.findOneAndUpdate({ _id: userId }, { $push: { [keyName]: value }}, function (error, success){
            if (error) {
                console.log(error);
            } else {
                console.log(success)
            }
        })
        res.send("1")
    })

    router.put('/removeFromUserArray/:userId', function (req, res) {
        let {keyName, value} = req.body 
        let {userId} = req.params
        User.findOneAndUpdate({ _id: userId }, { $pull: { [keyName]: value } }, function (error, success){
            if (error) {
                console.log(error);
            } else {
                console.log(success)
            }
        })
        res.send("1")
    })

    router.put('/updateUserDetails/:userId', function (req, res) {
        let {keyName, value} = req.body 
        let {userId} = req.params
        User.findOneAndUpdate({ _id: userId },  {$set: {[keyName]: value}}, function (error, success){
            if (error) {
                console.log(error);
            } else {
                console.log(success)
            }
        })
        res.send("1")
    })
  
module.exports = router