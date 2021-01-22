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
      searchFirst: observable,
      searchLast: observable,
      searchSeeking: observable,
      searchOffering: observable,
      searchCity: observable,
      searchCountry: observable,
      usersResults: observable,
      tradesResults: observable,
      perfectTrade: observable,
      // tagsForSearch: observable,
      // tradesByTags: observable,
      searchUsers: action,
      searchTrades: action,
      searchPerfectTrades: action,
      searchTradesByTags: action, 
      initialSearch: action
    })
  }
  async searchUsers() {
    const usersResults = await axios.get(`http://localhost:3001/search/user?searchFirst=${this.searchFirst}&searchLast=${this.searchLast}&searchCity=${this.searchCity}&searchLocation=${this.searchCountry}`);
    this.usersResults = usersResults.data;
  }
  async searchTrades() {
    const tradesResults = await axios.get(`http://localhost:3001/search/trade?searchSeeking=${this.searchSeeking}&searchOffering=${this.searchOffering}&searchCity=${this.searchCity}&searchLocation=${this.searchCountry}`);
    this.tradesResults = tradesResults.data;
  }
  async searchPerfectTrades() {
    const tradesResults = await axios.get(`http://localhost:3001/search/perfecttrade?searchSeeking=${this.searchSeeking}&searchOffering=${this.searchOffering}&searchCity=${this.searchCity}&searchLocation=${this.searchCountry}`);
    this.tradesResults = tradesResults.data;
  }
  async searchTradesByTags() {
    const trades = await axios.get(`http://localhost:3001/search/tradeTags`, this.tagsForSearch);
    this.tradesByTags = trades.data;
  }

  async initialSearch(city, country) {
    const tradesResults = await axios.get(`http://localhost:3001/search/trade?searchSeeking=null&searchOffering=null&searchCity=${city}&searchLocation=${country}`);
    this.tradesResults = tradesResults.data;
    const usersResults = await axios.get(`http://localhost:3001/search/userbylocation?searchFirst=null&searchLast=null&searchCity=${city}&searchCountry=${country}`)
    this.usersResults = usersResults.data
    console.log(this.usersResults)
  }
}