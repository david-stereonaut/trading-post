import { observable, action, computed, makeObservable } from 'mobx'
import axios from 'axios'
export class SearchStore {
  constructor() {
    this.firstName = null;
    this.lastName = null;
    this.location = null;
    this.users = [];
    this.seeking = [];
    this.offering = [];
    this.location = null;
    this.trades = [];
    this.perfectTrade = false;
    this.allTags = [];
    this.tagsForSearch = [];
    this.tradesByTags = []
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
      searchUsers: action,
      searchTrades: action,
      searchPerfectTrades: action,
      getTags: action,
      searchTradesByTags: action
    })
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