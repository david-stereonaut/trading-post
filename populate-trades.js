let data = require('./dummyTrades.json')
const mongoose = require('mongoose')
const TradeCard = require('./server/models/TradeCardModel')
const User = require('./server/models/UserModel')
mongoose.connect("mongodb+srv://TradingPostUser:elevation@cluster0.wllqb.mongodb.net/TradingPost?retryWrites=true&w=majority")

// const putData = async (arr) => {
//   let cards = await TradeCard.find({})
//   // let liaSeekingCards = cards.filter(card => (card.user_id == '60045b1519f39a2c9c46c63e' && card.type == 'Seeking')).map(card => card._id)
//   // let liaOfferingCards = cards.filter(card => (card.user_id == '60045b1519f39a2c9c46c63e' && card.type == 'Offering')).map(card => card._id)

//   // let adamSeekingCards = cards.filter(card => (card.user_id == '6004588a19f39a2c9c46c63d' && card.type == 'Seeking')).map(card => card._id)
//   // let adamOfferingCards = cards.filter(card => (card.user_id == '6004588a19f39a2c9c46c63d' && card.type == 'Offering')).map(card => card._id)

//   // await User.findByIdAndUpdate('60045b1519f39a2c9c46c63e', {seeking: [...liaSeekingCards], offering: [...liaOfferingCards]})
//   // await User.findByIdAndUpdate('6004588a19f39a2c9c46c63d', {seeking: [...adamSeekingCards], offering: [...adamOfferingCards]})

//   let user = await User.findById('60045b1519f39a2c9c46c63e').populate('offering').populate('seeking')
//   console.log(user)
// }

// putData()

const user1 = '6004588a19f39a2c9c46c63d'

const user2 = '60045b1519f39a2c9c46c63e'

const switchTradeCards = async (id) => {
  let users = await User.find({})
  
}

// switchTradeCards(user2)

User.updateMany({}, { $set: { password: '$2b$10$nq5yqcp3MA2Zdxgt5o/SW.38.j1r.pKF456BDQCMcn.ZSadqXZhqy'}}, { multi: true } );

// this.tradesResults = JSON.parse([
//   {
//     "id": "6004588a19f39a2c9c46c63d",
//     "type": "Offering", 
//     "title": "Pet Sitting",
//     "subTitle": "Dog/Cat Sitter/Walker",
//     "description": "I love animals. I don't have one of my own, but would love to take care of yours while you're away, either at my place or yours.",
//     "tags": ["Pet Care", "Dog Sitting", "Cat Sitting", "Dog Walking"],
//     "thumbnail": "https://f6h8q2y9.stackpathcdn.com/wp-content/uploads/2013/07/Bigstock-17506091-Dogs.jpg"
//   }, 
//   {
//     "id": "6004588a19f39a2c9c46c63d",
//     "type": "Offering", 
//     "title": "Middle Eastern Cuisine",
//     "subTitle": "Can make or teach you how to make",
//     "description": "Sick of your own cooking? Try some of my family recipes. My Mom is Persian, my father Iraqi- this is the best food in the world. I can teach you in person or over the internet. Or I can make you a 3 course meal if you're in the area.",
//     "tags": ["Cooking", "Middle Eastern", "Food", "Instruction", "Classes"],
//     "thumbnail": "https://www.destinationiran.com/wp-content/uploads/2011/01/Iranian-Food-Restaurants.jpg"
//   }, 
//   {
//     "id": "6004588a19f39a2c9c46c63d",
//     "type": "Offering", 
//     "title": "Bird feeder making",
//     "subTitle": "Woodworking class",
//     "description": "Want to attract some birds? Build something with your own two hands? I'll teach you how to build your own birdhouse - you supply the materials, I'll supply the know-how. In person or online (If online you'll need your own tools.",
//     "tags": ["Woodshop", "Woodworking", "Birdhouse", "Bird Feeder", "DIY", "Instruction", "Classes"],
//     "thumbnail": "https://i.pinimg.com/originals/f1/af/3f/f1af3f76222f781d313251611899a7e5.jpg"
//   }, 
//   {
//     "id": "6004588a19f39a2c9c46c63d",
//     "type": "Seeking", 
//     "title": "Tai Chi class",
//     "subTitle": "or any martial arts, preferably in person",
//     "description": "I heard martial arts is good for being present and concentration. I prefer to learn in person, but also open to online. Preferably in the evenings or Fridays. Prefer Tai Chi but open to other stuff- barterers can't be choosers.",
//     "tags": ["Martial Arts", "Tai Chi", "In Person", "Online", "Zoom", "Exercise", "Instruction", "Classes"],
//     "thumbnail": "https://www.researchgate.net/profile/Tzu-Min_Chan2/publication/262227970/figure/fig2/AS:339658849439751@1457992388648/The-eight-essentials-of-Tai-Chi-The-eight-essentials-of-Tai-Chi-contain-eight-actions.png"
//   }, 
//   {
//     "id": "6004588a19f39a2c9c46c63d",
//     "type": "Seeking", 
//     "title": "Bass Guitar",
//     "subTitle": "Music lessons",
//     "description": "I have my brother's old bass and I would love to learn. Prefer in person, but I guess online is ok.",
//     "tags": ["Bass Guitar", "Music", "In Person", "Online", "Zoom", "Music Lessons", "Music Classes", "Classes"],
//     "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUkcdj5-zZp2ZpA9Iy3oyl8f_LgQGC_fiO9g&usqp=CAU"
//   }
// ])