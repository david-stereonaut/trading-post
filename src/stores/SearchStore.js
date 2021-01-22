import { observable, action, computed, makeObservable } from 'mobx'
import axios from 'axios'
export class SearchStore {
  constructor() {
    this.firstName = null;
    this.lastName = null;
    this.searchCity = null;
    this.searchCountry = null;
    this.users = [];
    this.seeking = [];
    this.offering = [];
    this.location = null;
    this.trades = [];
    this.perfectTrade = false;
    this.allTags = [];
    this.tagsForSearch = [];
    this.tradesByTags = [];
    this.searchType = 'people'
   
    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      location: observable,
      users: observable,
      seeking: observable,
      offering: observable,
      location: observable,
      trades: observable,
      perfectTrade: observable,
      allTags: observable,
      tagsForSearch: observable,
      tradesByTags: observable,
      searchType: observable,
      searchUsers: action,
      searchTrades: action,
      searchPerfectTrades: action,
      getTags: action,
      searchTradesByTags: action,
      handleFirstName: action,
      hendleLocation:action
    })
  }
  handleSearchType = (value) => {
    this.searchType = value;
  }
  
  handleFirstName = (value) => {
    this.firstName = value;
    console.log(this.firstName)
  }
  handleLastName = (value) => {
    this.lastName = value;
    console.log(this.lastName)
  }
  handleOffering = (value) => {
    this.offering = value;
    console.log(this.offering)
  }
  handleSeeking = (value) => {
    this.seeking = value;
    console.log(this.seeking)
  }
  hendleLocation = (location) => {
    this.searchCity = location[0];
    this.searchCountry = location[1];
    console.log(this.searchCity)
    console.log(this.searchCountry)
  }

  async searchUsers() {
    const users = await axios.get(`http://localhost:3001/search/user?firstname=${this.firstName}&lastname=${this.lastName}`);
    this.users = users.data;
  }
  async searchTrades() {
    const trades = await axios.get(`http://localhost:3001/search/trade?seeking=${this.seeking}&offering=${this.offering}&location=${this.location}`);
    this.trades = trades.data;
  }
  async searchPerfectTrades() {
    const trades = await axios.get(`http://localhost:3001/search/perfecttrade?seeking=${this.seeking}&offering=${this.offering}&location=${this.location}`);
    this.trades = trades.data;
  }
  async getTags() {
    const tags = await axios.get(`http://localhost:3001/getTags`);
    this.allTags = tags.data;
  }
  async searchTradesByTags() {
    const trades = await axios.get(`http://localhost:3001/search/tradeTags`, this.tagsForSearch);
    this.tradesByTags = trades.data;
  }
}