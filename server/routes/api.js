const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const TradeCard = require('../models/TradeCardModel')
const User = require('../models/UserModel')

router.get('/myuser/:userId', async function (req, res) {
    const {userId} = req.params
    const data = await User.findById(userId).populate('offering', 'seeking' )
        let {id, email,firstName,lastName,location,offeringTags,seekingTags,offering,seeking,conversations,content,reviews,profilePic, images, description} = data
            const newData = {
                id,
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
    const data = await User.findById(userId).populate('offering', 'seeking')
        let {id, email,firstName,lastName,location,offeringTags,seekingTags, offering, seeking, content,reviews,profilePic,images, description} = data
            const newData ={
                id,
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
       
    router.post('/tradecard', function (req, res) {
        let data = req.body
       const newData = new TradeCard({...data})
        newData.save()
            .then(response => {
                console.log('add tradecard')
            })
        res.send("1")
    })

      
    router.post('/conversation', function (req, res) {
        let data = req.body
       const newData = new Conversation({...data})
        newData.save()
            .then(response => {
                console.log('add conversation')
            })
        res.send("1")
    })

    // router.put('/trade/:tradeId', function (req, res) {
    //     let data = req.body
    //     let {tradeId} = req.params
    //     const newData = new User({...data})
    //     res.send("1")
    // })
    

   router.put('/addImage/:userId', function (req, res) {
        let {imageUrl} = req.body 
        let {userId} = req.params
        User.findOneAndUpdate({ _id: userId }, { $push: { images: imageUrl }}, function (error, success){
            if (error) {
                console.log(error);
            } else {
                console.log(success)
            }
        })
        res.send("1")
    })

    router.put('/removeImage/:userId', function (req, res) {
        let {imageUrl} = req.body 
        let {userId} = req.params
        User.findOneAndUpdate({ _id: userId }, { $pull: {images: imageUrl} }, function (error, success){
            if (error) {
                console.log(error);
            } else {
                console.log(success)
            }
        })
        res.send("1")
    })

    router.put('/profilePic/:userId', function (req, res) {
        let {newProfilePic} = req.body 
        let {userId} = req.params
        User.findOneAndUpdate({ _id: userId },  { profilePic: newProfilePic }, function (error, success){
            if (error) {
                console.log(error);
            } else {
                console.log(success)
            }
        })
        res.send("1")
    })

    router.put('/updateUserDetails/:userId', function (req, res) {
        let {newFirstName, newLastName, newDescription} = req.body // FrontEnd: Decide which variables are updated
        let {userId} = req.params
        User.findOneAndUpdate({ _id: userId },  { description: newDescription }, {firstName: newFirstName }, {lastName: newLastName}, function (error, success){
            if (error) {
                console.log(error);
            } else {
                console.log(success)
            }
        })
        res.send("1")
    })
    
   
module.exports = router