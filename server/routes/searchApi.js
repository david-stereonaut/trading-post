const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
///search/user?lastname=idan&firstname=dayan
router.get('/search/user',async function (req, res) {
    const {lastname,firstname} = req.query
    try {        
        const user = await User.find({$or: [{lastName:lastname},{firstName:firstname}]}).populate('offering').populate('seeking')
        res.send(user)
    }
    catch (err) {
        res.send(err.message)
    }
})
///search/trade?seeking=["Synth","Cooking"]&offering=Languages&location=Israel
router.get('/search/trade',async function (req, res) {
    const {seeking,offering,location} = req.query
    try {        
        const users = await User.find({$and:[{$or: [{offeringTags: seeking},{seekingTags:offering}]},{"location.country": {$in:location}}]}).populate('offering').populate('seeking').limit(20)
        res.send(users)
    }
    catch (err) {
        res.send(err.message)
    }
})
router.get('/search/perfecttrade',async function (req, res) {
    const {seeking,offering,location} = req.query
    try {        
        const users = await User.find({$and:[{$and: [{offeringTags: seeking},{seekingTags:offering}]},{"location.country": {$in:location}}]}).populate('offering').populate('seeking').limit(20)
        res.send(users)
    }
    catch (err) {
        res.send(err.message)
    }
})
module.exports = router