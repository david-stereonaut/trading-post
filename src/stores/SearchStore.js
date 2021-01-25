import { observable, action, computed, makeObservable } from 'mobx'
import axios from 'axios'

export class SearchStore {
  constructor() {
    this.allTags = []
    this.results = []
    this.searchFor = 'trades'
    this.seekingFilter = true
    this.offeringFilter = true
    this.seekingTagsFilter = []
    this.offeringTagsFilter = []
    this.location = null
    this.sortBy = 'location'
   
    makeObservable(this, {
      allTags: observable,
      getAllTags: action,
      results: observable,
      initialSearch: action,
      location: observable,
      handleLocation: action,
      searchFor: observable,
      seekingFilter: observable,
      offeringFilter: observable,
      setSeekingFilter: action,
      setOfferingFilter: action,
      seekingTagsFilter: observable,
      offeringTagsFilter: observable,
      setSeekingTagsFilter: action,
      setOfferingTagsFilter: action,
      sortBy: observable,
      setSortBy: action,
    })
  }


  async searchSwap(offering, seeking) {

    console.log(`http://localhost:3001/search/imperfecttrade?seeking=[${this.seekingTagsFilter}]&offering=${this.offeringTagsFilter}&location=null`)
    const results = await axios.get(`http://localhost:3001/search/imperfecttrade?seeking=${this.seekingTagsFilter}&offering=${this.offeringTagsFilter}`);
    this.results = results.data;
    this.searchFor = 'people'
  }

  async searchExactSwap() {
    const results = await axios.get(`http://localhost:3001/search/perfecttrade?seeking=${this.seekingTagsFilter}&offering=${this.offeringTagsFilter}`);
    this.results = results.data;
    this.searchFor = 'people'
  }

  setSeekingFilter(value) {
    this.seekingFilter = value
  }

  setOfferingFilter(value) {
    this.offeringFilter = value
  }

  setSeekingTagsFilter(value) {
    console.log(value)
    this.seekingTagsFilter = value
    console.log(this.SeekingTagsFilter)
  }

  setOfferingTagsFilter(value) {
    this.offeringTagsFilter = value
  }

  getOfferingTagsArray(){
    console.log(this.offeringTagsFilter.toString())
    console.log(this.offeringTagsFilter)
    return this.offeringTagsFilter.toString()
  }

  getSeekingTagsArray(){
    return this.seekingTagsFilter.toString()
  }

  setSortBy(value) {
    this.sortBy = value
  }

  handleLocation = (location) => {
    this.searchCity = location[0];
    this.searchCountry = location[1];
    console.log(this.searchCity)
    console.log(this.searchCountry)
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

  async searchOffering(text) {   
    const results = await axios.get(`http://localhost:3001/search/trades?q=${text}`);
    this.results = results.data.filter(card => card.type === "Offering")
    this.searchFor = 'trades'
  }

  async searchSeeking(text) {   
    const results = await axios.get(`http://localhost:3001/search/trades?q=${text}`);
    this.results = results.data.filter(card => card.type === "Seeking")
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