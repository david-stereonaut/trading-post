import { observable, action, computed, makeObservable } from  'mobx';
const axios = require('axios');

export class UserStore {
  constructor() {
<<<<<<< HEAD
    this.user = {
      "email": "LiaLevy@pmail.com",
      "password": "LiaRules",
      "firstName": "Lia",
      "lastName": "Levy",
      "profilePic": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Woodworking_Tools_at_the_Women%27s_Woodshop_in_Minneapolis%2C_MN.jpg/220px-Woodworking_Tools_at_the_Women%27s_Woodshop_in_Minneapolis%2C_MN.jpg",
      "https://esmmweighless.com/wp-content/uploads/2019/12/Carolyn-Cooking-Blog.jpg", 
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJDZvwSrdAdHgArNF7X_7w_ATxy8fkY8oAg&usqp=CAU"
       ],
      "location": {
          "country": "Israel",
          "city": "Tel Aviv",
          "street": "Shlomo Hamelech"
      },
      "offeringTags": ["Martial Arts", "Tae Kwon Do", "Cooking", "Woodworking"],
      "seekingTags": ["Languages", "Arabic", "Dog Sitting", "Cooking"],
      "offering": [], 
      "seeking" : [], 
      "conversations": [],
      "content": [],
      "reviews": []
      }
    

    makeObservable(this, {
      user: observable
=======
    this.user = {};
    this.watchedUser = {};

    makeObservable(this, {
      user: observable,
      watchedUser, observable
>>>>>>> master
    })
  }

  async fetchUser() {
    const user = await axios.get(`http://localhost:3001/myUser/${this.user.id}`);
    this.user = user;
  }

  async fetchWatchedUser(id) {
    const user = await axios.get(`http://localhost:3001/user/${id}`);
    this.watchedUser = user;
  }

  async startConversation(subject, text) {
    const conversation = {
      senderId = this.user.id,
      recieverId = this.watchedUser.id,
      subject = subject,
      text = text
    }
    await axios.post(`http://localhost:3001/startConversation`, conversation);
    const conversations = await axios.get(`http://localhost:3001/conversations/${this.user.id}`);
    this.user.conversations = conversations
  }

  // editTrade

  async addTag(tag) {
    await axios.put(`http://localhost:3001/addTag/${this.user.id}/${tag}`);
    this.user.tags.push(tag);
  }

  async removeTag(tag) {
    await axois.delete(`http://localhost:3001/removeTag/${this.user.id}/${tag}`);
    this.user.tags.splice(this.user.tags.indexOf(tag), 1);
  }

  async addImage(imageUrl) {
    await axios.post(`http://localhost:3001/addImage/${this.user.id}`, imageUrl);
    const images = await axios.get(`http://localhost:3001/images/${this.user.id}`);
    this.user.images = images;
  }
  
  async removeImage(imageUrl) {
    await axois.delete(`http://localhost:3001/removeImg/${this.user.id}/${imageUrl}`);
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
