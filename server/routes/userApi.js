const express = require('express')
const router = express.Router()
const Conversation = require('../models/ConversationModel')
const TradeCard = require('../models/TradeCardModel')
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
const secret = 'secrettradingpost';

// POST route to register a user
router.post('/user/register', async function(req, res) {
    const user = new User({ ...req.body });
    console.log('-----')
    console.log(req.body)
    console.log(user)
    console.log('-----')
    await user.save(function(err) {
      if (err) {
       console.log(err);
      } else {
        res.status(200).send(user._id);
      }
    });
  });

  router.post('/user/authenticate', function(req, res) {
    const { email, password } = req.body;
    console.log(email, password)

    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .send({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .send({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .send({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .send({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .send(user._id);
          }
        });
      }
    });
  });

router.get('/myuser/:userId',  async function (req, res) {
    const { userId } = req.params
    const data = await User.findById(userId).populate([
      'tradeCards',
      {
        path: 'reviews',
        populate: {
            path: 'reviewer',
            select: '_id firstName lastName profilePic'
        }
      },
      {
        path: 'neighbors',
        select: '_id firstName lastName profilePic seekingTags offeringTags location neighbors'
      }
    ])
    data.reviews.forEach(r => r.stars = null)
    let { password, ...newData} = data.toObject()
    res.send(newData)
})

router.get('/user/:userId', async function (req, res) {
    const { userId } = req.params
    const data = await User.findById(userId).populate([
      'tradeCards',
      {
        path: 'reviews',
        populate: {
            path: 'reviewer',
            select: '_id firstName lastName profilePic'
        }
      },
      {
        path: 'neighbors',
        select: '_id firstName lastName profilePic seekingTags offeringTags location neighbors'
      }
    ])
    data.reviews.forEach(r => r.stars = null)
    let { password, conversations, ...newData } = data.toObject()
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

router.post('/review/:userId', async function (req, res) {
  let review = req.body;
  let { userId } = req.params;
  try {
      const updatedUser = await User.findByIdAndUpdate( userId , { $push: { reviews: review } }, { new: true })
      res.send(updatedUser)
  }
  catch (err) {
      res.send(err.message)
  }
})

router.post('/neighbors', async function (req, res) {
  let user1 = req.body.user1;
  let user2 = req.body.user2;
  try {
    await User.findByIdAndUpdate( user1 , { $push: { neighbors: user2 } }, { new: true });
    await User.findByIdAndUpdate( user2 , { $push: { neighbors: user1 } }, { new: true });
    res.end();
  }
  catch (err) {
      res.send(err.message)
  }
})

router.put('/addToUserArray/:userId',async function (req, res) {
    let { userId } = req.params
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $push: req.body }, { new: true, useFindAndModify: false })
        res.send(updatedUser)
    }
    catch (err) {
        res.send(err.message)
    }
})

router.put('/removeFromUserArray/:userId',async function (req, res) {
    let { userId } = req.params
    console.log(req.body)
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $pull: req.body }, { new: true, useFindAndModify: false })
        res.send(updatedUser)
    }
    catch (err) {
        res.send(err.message)
    }
})

// router.put('/updateUserDetails/:userId', async function (req, res) {
//     const { keyName, value } = req.body
//     const { userId } = req.params
//     try {
//         const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: { [keyName]: value } }, { new: true })
//         res.send(updatedUser)
//     }
//     catch (err) {
//         res.send(err.message)
//     }
// })

router.put('/updateUserDetails/:userId', async function (req, res) {
    const { userId } = req.params
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true, useFindAndModify: false })
        res.send(updatedUser)
    }
    catch (err) {
        res.send(err.message)
    }
})

module.exports = router