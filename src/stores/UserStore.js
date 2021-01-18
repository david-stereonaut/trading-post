import { observable, action, computed, makeObservable } from  'mobx';
const axios = require('axios');

export class UserStore {
  constructor() {

    this.user = {};
    this.watchedUser = {};
    this.dummyTrades = [{ "userId": "60045b1519f39a2c9c46c63e",
        "type": "Offering", 
        "title": "Taekwondo Instruction",
        "subTitle": "Martial Arts Classes in person or over the internet",
        "description": "I'm a black belt looking to teach Taekwondo go any and all ages. I've been learning since I was a child, and have experience teaching in summer camps and after school programs. I can teach in person or over the internet if you have a partner to spar with.",
        "tags": ["Martial Arts", "Tae Kwon Do", "Taekwondo", "Classes", "In person", "Zoom", "Instruction"],
        "thumbnail": "https://tigerkimstkd.com/wp-content/uploads/2018/07/teaching-kids-taekwondo-stance.jpg"
    },
    { "userId": "60045b1519f39a2c9c46c63e",
        "type": "Seeking", 
        "title": "Dog Sitter",
        "subTitle": "Looking for an occasional dog sitter in Tel Aviv",
        "description": "Looking for someone to sit my sweet and energetic dog Shadow when I go away on vacation.",
        "tags": ["Pet Care", "Dog Sitting", "Dog Walking", "Classes", "In person", "Zoom", "Instruction"],
        "thumbnail": "https://tigerkimstkd.com/wp-content/uploads/2018/07/teaching-kids-taekwondo-stance.jpg"
    },
    {"userId": "60045b1519f39a2c9c46c63e",
        "type": "Offering", 
        "title": "Woodworking",
        "subTitle": "Make you something or teach you how to make it yourself",
        "description": "I have a woodworking studio in my home. I do small pieces like birdhouses, tables, and shelves. I can make something for someone in my area or teach you how to make something.",
        "tags": ["Woodworking", "Furniture Making", "Birdhouses", "Wooden", "Classes", "In person", "Zoom", "Instruction"],
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTycmUbGjNIBE8JA2jv5guUiM-SsQUIoWzong&usqp=CAU"
    },
    {"userId": "60045b1519f39a2c9c46c63e",
        "type": "Offering", 
        "title": "Dinner for four",
        "subTitle": "Cook together or I'll cook for you",
        "description": "I love cooking and cooking for other people. I'm happy to cook for you or cook together and I can teach you my favorite recipes. Also happy to swap dinner - we all get sick of our own recipes, I'd love to try yours. I could also teach over the internet.",
        "tags": ["Cooking", "Dinner", "Food", "Classes", "In person", "Zoom", "Instruction"],
        "thumbnail": "https://pinchofyum.com/wp-content/uploads/quinoa-casserole-square-260x195.jpg"
    },
    {"userId": "60045b1519f39a2c9c46c63e",
        "type": "Seeking", 
        "title": "Beginner Arabic Instruction",
        "subTitle": "Looking for an Arabic teacher - in person or over internet",
        "description": "I would love to learn conversational Arabic. I know the alphabet and some basic vocabulary, and I am learning from an app, but I need someone to practice speaking and verb conjugation.",
        "tags": ["Language", "Language exchange", "Arabic", "Classes", "In person", "Zoom", "Instruction"],
        "thumbnail": "https://ih1.redbubble.net/image.1169808875.6175/fposter,small,wall_texture,product,750x1000.jpg"
    }]

    makeObservable(this, {
      user: observable,
      watchedUser: observable,
      dummyTrades: observable
    })
  }

  async fetchUser() {
    const user = await axios.get(`http://localhost:3001/myUser/60045b1519f39a2c9c46c63e`);
    this.user = user.data;
  }

  async fetchWatchedUser(id) {
    const user = await axios.get(`http://localhost:3001/user/${id}`);
    this.watchedUser = user.data;
  }

  async startConversation(subject, text) {
    const conversation = {
      senderId: this.user.id,
      recieverId : this.watchedUser.id,
      subject: subject,
      text: text
    }
    await axios.post(`http://localhost:3001/startConversation`, conversation);
    const conversations = await axios.get(`http://localhost:3001/conversations/${this.user.id}`);
    this.user.conversations = conversations.data
  }

  // editTrade

  async addTag(tag) {
    await axios.put(`http://localhost:3001/addTag/${this.user.id}/${tag}`);
    this.user.tags.push(tag);
  }

  async removeTag(tag) {
    await axios.delete(`http://localhost:3001/removeTag/${this.user.id}/${tag}`);
    this.user.tags.splice(this.user.tags.indexOf(tag), 1);
  }

  async addImage(imageUrl) {
    await axios.post(`http://localhost:3001/addImage/${this.user.id}`, imageUrl);
    const images = await axios.get(`http://localhost:3001/images/${this.user.id}`);
    this.user.images = images.data;
  }
  
  async removeImage(imageUrl) {
    await axios.delete(`http://localhost:3001/removeImg/${this.user.id}/${imageUrl}`);
    this.user.images.splice(this.user.images.indexOf(imageUrl), 1);
  }

  async changeProfilePic(imageUrl) {
    await axios.put(`http://localhost:3001/profilePic/${this.user.id}`, imageUrl);
    this.user.profileImg = imageUrl;
  }

  async updateUserName(newName, newDescription) {
    const details = {
      newName: newName,
      newDescription: newDescription
    }
    await axios.put(`http://localhost:3001/updateUserDetails/${this.user.id}`, details);
    this.user.name = newName;
    this.user.description = newDescription;
  }
}
