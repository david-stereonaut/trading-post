import { observable, action, computed, makeObservable } from  'mobx';
const axios = require('axios');

export class UserStore {
  constructor() {

    this.user = {};
    this.watchedUser = {};

    makeObservable(this, {
      user: observable,
      watchedUser: observable,
      fetchUser: action,
      fetchWatchedUser: action,
      startConversation: action,
      addTag: action,
      removeTag: action,
      addImage: action,
      removeImage: action,
      changeProfilePic: action,
      updateUserName: action,
      getWatchedUser: computed,
      getUser: computed
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

  async addImage(imageUrl) {
    const newImage = {
      keyName: 'images',
      value: imageUrl
    }
    const user = await axios.put(`http://localhost:3001/addToUserArray/${this.user._id}`, newImage);
    this.user = user.data;
  }
  
  async removeImage(imageUrl) {
    const imageToRemove = {
      keyName: 'images',
      value: imageUrl
    }
    const user = await axios.put(`http://localhost:3001/removeFromUserArray/${this.user._id}`, imageToRemove);
    this.user = user.data;
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

  get getUser() {
    return this.user
  }

  get getWatchedUser() {
    return this.watchedUser
  }
}
