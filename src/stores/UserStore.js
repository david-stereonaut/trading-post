import { observable, action, computed, makeObservable } from 'mobx';
const axios = require('axios');

export class UserStore {
  constructor() {

    this.user = {};
    this.watchedUser = {};
    this.userId = null;

    makeObservable(this, {
      user: observable,
      watchedUser: observable,
      userId: observable,
      fetchUser: action,
      fetchWatchedUser: action,
      startConversation: action,
      addTag: action,
      removeTag: action,
      loginUser: action,
      addImage: action,
      removeImage: action,
      changeProfilePic: action,
      updateUserName: action,
      signOut: action,
      setUserId: action
    })
  }


  
  async loginUser(email, password) {
    try {
      const userId = await axios.post(`http://localhost:3001/user/authenticate`, {email, password});
      this.userId = userId.data
      localStorage.setItem('userId', userId.data);
      return "ok"
    }
    catch (err) {
      return err.response.data.error
    }
  }

  async fetchUser() {
    const user = await axios.get(`http://localhost:3001/myUser/${this.userId}`);
    this.user = user.data;
  }

  async fetchWatchedUser(id) {
    const user = await axios.get(`http://localhost:3001/user/${id}`);
    console.log(user.data)
    this.watchedUser = user.data;
  }

  async startConversation(subject, text) {
    const conversation = {
      senderId: this.user.id,
      recieverId: this.watchedUser.id,
      subject: subject,
      text: text
    }
    await axios.post(`http://localhost:3001/startConversation`, conversation);
    const conversations = await axios.get(`http://localhost:3001/conversations/${this.user._id}`);
    this.user.conversations = conversations.data
  }

  // editTrade

  async addTag(tag, type) {
    let tagType = type === 'offering' ? 'offeringTags' : 'seekingTags'
    let data = {
      [tagType]: tag
    }
    const user = await axios.put(`http://localhost:3001/addToUserArray/${this.user._id}`, data);
    this.user[tagType] = user.data[tagType]
  }

  async removeTag(tag, type) {
    let tagType = type === 'offering' ? 'offeringTags' : 'seekingTags'
    let data = {
      [tagType]: tag
    }
    const user = await axios.put(`http://localhost:3001/removeFromUserArray/${this.user._id}`, data);
    this.user[tagType] = user.data[tagType];
  }

  async addImage(imageUrl, imageId) {
    const data = {
      images: {
        imageUrl,
        imageId
      }
    }
    const user = await axios.put(`http://localhost:3001/addToUserArray/${this.user._id}`, data);
    this.user.images = user.data.images;
  }

  async removeImage(imageUrl, imageId) {
    const data = {
      images: { imageUrl }
    }
    const user = await axios.put(`http://localhost:3001/removeFromUserArray/${this.user._id}`, data);
    axios.post('http://localhost:3001/destroyImage', { id: imageId })
    this.user.images = user.data.images;
  }

  async changeProfilePic(imageUrl, imageId) {
    const data = {
      profilePic: {
        imageUrl,
        imageId
      }
    }
    const user = await axios.put(`http://localhost:3001/updateUserDetails/${this.user._id}`, data);
    this.user.profilePic = user.data.profilePic
  }

  async updateUserName(firstName, lastName, description) {
    const data = {
      firstName,
      lastName,
      description
    }
    const user = await axios.put(`http://localhost:3001/updateUserDetails/${this.user._id}`, data);
    this.user.firstName = user.data.firstName
    this.user.lastName = user.data.lastName
    this.user.description = user.data.description
  }

  // async updateTradeCard(tradeCard) {
  //   const type = tradeCard.type.toLowerCase()
  //   const data = {
  //     [type]: tradeCard
  //   }
  //   const user = await axios.put(`http://localhost:3001/addToUserArray/${this.user._id}`, data);
  //   this.user[type] = user.data[type]
  // }

  async addTradeCard(tradeCard) {
    console.log(tradeCard)
    const user = await axios.post(`http://localhost:3001/tradecard/${this.user._id}`, tradeCard);
    this.user.tradeCards = user.data.tradeCards
  }

  async deleteTradeCard(tradeCardId) {
    const user = await axios.delete(`http://localhost:3001/tradecard/${this.user._id}`, { data: { tradeCardId } });
    this.user.tradeCards = user.data.tradeCards
  }

  async editTradeCard(tradeCard, tradeCardId) {
    const user = await axios.put(`http://localhost:3001/tradecard/${this.user._id}`, { tradeCard, tradeCardId });
    this.user.tradeCards = user.data.tradeCards
  }

  setUserId(id) {
    this.userId = id
  }

  signOut() {
    this.user = {};
    this.userId = null;
  }

}
