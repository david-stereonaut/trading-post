import { observable, action, computed, makeObservable } from 'mobx';
const axios = require('axios');

export class UserStore {
  constructor() {

    this.user = {};
    this.watchedUser = {};
    this.userId = null;
    this.neighborhood = [];

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
      setUserId: action,
      isNeighbor: action,
      isNeighborhood: action,
      getNeighborhood: action,
      registerUser: action, 
      addNeighbor:action
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


  async registerUser(user) {
    try {
      const userId = await axios.post(`http://localhost:3001/user/register`, user);
      console.log(userId.data)
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
    // this.getNeighborhood();
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

  getNeighborhood = () => {
    if (!this.user.neighborhood) { return }
    if(!this.user.neighbors) {return}
    const allNeighbors =  [];
    this.user.neighbors.forEach(n => n.neighbors.forEach(n => allNeighbors.push(n)));
    const neighborhood = [...new Set(allNeighbors)];
    this.neighborhood = neighborhood;
  }

  isNeighbor = userId  => this.user.neighbors && this.user.neighbors.some(n => n._id === userId);

  isNeighborhood = userId => this.neighborhood.includes(userId);

  async addNeighbor(){
    if (this.isNeighbor(this.watchedUser._id)) {return}
    try {
      console.log('trig')
      const user1 = this.user._id
      const user2 = this.watchedUser._id
      await axios.post(`http://localhost:3001/neighbors`, {user1, user2})
      await this.fetchUser()
      await this.fetchWatchedUser(this.watchedUser._id)
    }
    catch (err) {
      return err.response.data.error
    }
  }

  async removeNeighbor() {
    if (!this.isNeighbor(this.watchedUser._id)) {return}
    try {
      const user1 = this.user._id
      const user2 = this.watchedUser._id
      await axios.delete(`http://localhost:3001/neighbors`, { data: {user1, user2}})
      await this.fetchUser()
      await this.fetchWatchedUser(this.watchedUser._id)
    }
    catch (err) {
      return err.response.data.error
    }
  }

  async fetchWatchedUser(id) {
    const user = await axios.get(`http://localhost:3001/user/${id}`);
    this.watchedUser = {...user.data, neighbor: this.isNeighbor(user.data._id)};
    console.log(this.watchedUser)
  }
}