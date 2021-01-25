const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const User = require('../models/UserModel')

router.get('/conversations/:userId', async function (req, res) {
    const { userId } = req.params
    try {
        const data = await User.findById(userId).populate([
            {
                path: 'conversations',
                populate: {
                    path: 'users',
                    select: '_id firstName lastName profilePic'
                }
            }
        ])
        const { conversations } = data
        res.send({ conversations })
    } catch (err) {
        res.send(err.message)
    }
})

router.post('/conversations/addconversation', async function (req, res) {
    let data = req.body
    let { users } = req.body
    try {
        const conversationUploaded = new Conversation({ ...data })
        await conversationUploaded.save()
        await User.updateMany({ _id: { $in: [users[0], users[1]] } }, { $push: { conversations: conversationUploaded } })
        res.send(conversationUploaded)
    }
    catch (err) {
        res.send(err.message)
    }
})

router.post('/conversations/:conversationId', async function (req, res) {
    let message = req.body
    let { conversationId } = req.params
    try {
        const updatedConversation = await Conversation.findByIdAndUpdate( conversationId , { $push: { messages: message } }, { new: true })
        res.send(updatedConversation)
    }
    catch (err) {
        res.send(err.message)
    }
})

router.put('/conversations/:conversationId', async function (req, res) {
    let newStatus = req.body.status
    let { conversationId } = req.params
    try {
        const updatedConversation = await Conversation.findOneAndUpdate({ _id: conversationId }, { status: newStatus }, { new: true })
        res.send(updatedConversation)
    }
    catch (err) {
        res.send(err.message)
    }
})

//ignore those routes, just helped me to restart dummydata (Eilon)

router.delete('/cons', async function (req, res) {
    await Conversation.remove({});
    await User.updateMany({}, { $set: { conversations: [] }});
    res.end();
})

router.post('/myConversations', async function (req, res) {
    req.body.forEach(async b => {
        let data = b
        let { users } = b
        try {
            const conversationUploaded = new Conversation({ ...data })
            await conversationUploaded.save()
            await User.updateMany({ _id: { $in: [users[0], users[1]] } }, { $push: { conversations: conversationUploaded } })
        }
        catch (err) {
            res.send(err.message)
        }
        res.send('done')
    })
})

module.exports = router