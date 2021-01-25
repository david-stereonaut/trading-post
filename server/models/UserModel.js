const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const saltRounds = 10;
const userSchema = new Schema({
    email:  { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: {
        imageUrl: String,
        imageId: String
    },
    description: String,
    images: [{
        imageUrl: String,
        imageId: String
    }],
    firstName: String,
    lastName: String,
    location: {
        country: String,
        city: String,
        lat: Number,
        lng: Number
    },
    offeringTags: [],
    seekingTags: [],
    tradeCards: [{ type: Schema.Types.ObjectId, ref: 'TradeCard' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    content: [],
    reviews: [{
      reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
      review: String,
      stars: Number
    }],
}, { versionKey: false })

userSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
      // Saving reference to this because of changing scopes
      const document = this;
      bcrypt.hash(document.password, saltRounds,
        function(err, hashedPassword) {
        if (err) {
          next(err);
        }
        else {
          document.password = hashedPassword;
          console.log(hashedPassword)
          next();
        }
      });
    } else {
      next();
    }
  });

  userSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    })};

const User = mongoose.model("User", userSchema)

module.exports = User;
