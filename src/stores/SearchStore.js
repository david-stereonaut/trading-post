import { observable, action, computed, makeObservable } from 'mobx'
import axios from 'axios'

export class SearchStore {
  constructor() {
    this.allTags = []
    this.results = []
    this.searchFor = 'trades'
    this.seekingFilter = true
    this.offeringFilter = true
    this.tagsFilter = []
    this.sortBy = 'location'
   
    makeObservable(this, {
      allTags: observable,
      getAllTags: action,
      results: observable,
      initialSearch: action,
      searchFor: observable,
      seekingFilter: observable,
      offeringFilter: observable,
      setSeekingFilter: action,
      setOfferingFilter: action,
      tagsFilter: observable,
      setTagsFilter: action,
      sortBy: observable,
      setSortBy: action
    })
  }

  setSeekingFilter(value) {
    this.seekingFilter = value
  }

  setOfferingFilter(value) {
    this.offeringFilter = value
  }

  setTagsFilter(value) {
    this.tagsFilter = value
  }

  setSortBy(value) {
    this.sortBy = value
  }

  async getAllTags() {
    const tags = await axios.get(`http://localhost:3001/getTags`);
    this.allTags = tags.data
  }

  async initialSearch() {
    const results = await axios.get(`http://localhost:3001/search/trades?q`);
    const tags = await axios.get(`http://localhost:3001/getTags`);
    this.results = results.data
    this.allTags = tags.data
  }

  async searchTrades(text) {
    const results = await axios.get(`http://localhost:3001/search/trades?q=${text}`);
    this.results = results.data
    this.searchFor = 'trades'
  }

  async searchUsers(text) {
    let splitted = text.split(' ')
    let results
    if (splitted.length <= 1 || text === '') {
      results = await axios.get(`http://localhost:3001/search/users?q=${text}`);
    } else {
      const firstName = splitted[0]
      const lastName = splitted.splice(1).toString().replace(',', ' ')
      results = await axios.get(`http://localhost:3001/search/users?firstName=${firstName}&lastName=${lastName}`);
    }
    this.results = results.data
    this.searchFor = 'people'
  }

}