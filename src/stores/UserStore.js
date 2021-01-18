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
      post: action,
      editTrade: action,
      addTag: action,
      removeTag: action,
      removeTag: action,
      addImage: action,
      removeImage: action,
      changeProfilePic: action,
      updateUserName: action
    })
  }

  async fetchUser() {
    const user = await axios.get(`http://localhost:3001/myUser/${this.user.id}`);
    this.user = user.data;
  }

  async fetchWatchedUser(id) {
    const user = await axios.get(`http://localhost:3001/user/${id}`);
    this.watchedUser = user.data;
  }

  // async startConversation(subject, text) {
  //   const conversation = {
  //     senderId: this.user.id,
  //     recieverId : this.watchedUser.id,
  //     subject: subject,
  //     text: text
  //   }
  //   await axios.post(`http://localhost:3001/startConversation`, conversation);
  //   const conversations = await axios.get(`http://localhost:3001/conversations/${this.user.id}`);
  //   this.user.conversations = conversations
  // }

  // editTrade

  async addTag(tag) {
    const newTag = {
      keyName: tag.type,
      value: tag.name
    }
    const user = await axios.put(`http://localhost:3001/addToUserArray/${this.user.id}`, newTag);
    this.user = user.data;
  }

  async removeTag(tag) {
    const tagToDelete = {
      keyName: tag.type,
      value: tag.name
    }
    const user = await axios.put(`http://localhost:3001/removeFromUserArray/${this.user.id}`, tagToDelete);
    this.user = user.data;
  }

  async addImage(imageUrl) {
    const newImage = {
      keyName: 'images',
      value: imageUrl
    }
    const user = await axios.put(`http://localhost:3001/addToUserArray/${this.user.id}`, newImage);
    this.user = user.data;
  }
  
  async removeImage(imageUrl) {
    const imageToRemove = {
      keyName: 'images',
      value: imageUrl
    }
    const user = await axios.put(`http://localhost:3001/removeFromUserArray/${this.user.id}`, imageToRemove);
    this.user = user.data;
  }

  async changeProfilePic(imageUrl) {
    const newProfilePic = {
      keyName = profilePic,
      value = imageUrl
    }
    const user = await axios.put(`http://localhost:3001/updateUserDetails/${this.user.id}`, newProfilePic);
    this.user = user.data;
  }

  async updateUserName(newFirstName, newLastName, newDescription) {
    const firstName = {
      keyName: 'firstName',
      value: newFirstName
    }
    const lastName = {
      keyName: 'lastName',
      value: newLastName
    }
    const description = {
      keyName: 'description',
      value: newDescription
    }
    await axios.put(`http://localhost:3001/updateUserDetails/${this.user.id}`, firstName);
    await axios.put(`http://localhost:3001/updateUserDetails/${this.user.id}`, lastName);
    const user = await axios.put(`http://localhost:3001/updateUserDetails/${this.user.id}`, description);
    this.user = user.data;
  }
}
