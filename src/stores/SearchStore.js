import { observable, action, computed, makeObservable } from 'mobx'
import axios from 'axios'
export class SearchStore {
  constructor() {
    this.searchFirst = null;
    this.searchLast = null;
    this.searchCity = null;
    this.searchCountry = null;
    this.searchSeeking = [];
    this.searchOffering = [];
    this.searchType = null;
    this.usersResults = [];
    this.tradesResults = [];
    this.perfectTrade = false;

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
      searchTradesByTags: action,
      handleSearchType: action
    })
  }
  handleSearchType = (value) => {
    this.searchType = value;
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