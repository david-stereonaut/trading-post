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
    this.searchFirst = null;
    this.searchLast = null;
    this.searchCity = null;
    this.searchCountry = null;
    this.searchSeeking = [];
    this.searchOffering = [];
    this.searchType = null;
    this.usersResults = [];
    this.tradesResults = [
      {
        "user_id": { 
          "_id": "6004588a19f39a2c9c46c63d",
          "firstName": "Ethan",
          "lastName": "Marx",
          "profilePic": {
            "imageUrl": "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "imageId": "none"
          },
          "location": {
            "country": "Israel",
            "city": "Tel Aviv",
            "lat": 32.064,
            "lng": 34.764
          }
        },
        "type": "Offering", 
        "title": "Pet Sitting",
        "subTitle": "Dog/Cat Sitter/Walker",
        "description": "I love animals. I don't have one of my own, but would love to take care of yours while you're away, either at my place or yours.",
        "tags": ["Pet Care", "Dog Sitting", "Cat Sitting", "Dog Walking"],
        "thumbnail": {"imageUrl": "https://f6h8q2y9.stackpathcdn.com/wp-content/uploads/2013/07/Bigstock-17506091-Dogs.jpg", "imageId": "none"}
      }, 
      {
        "user_id": { 
          "_id": "60045b3619f39a2c9c46c63f",
          "firstName": "Adam",
          "lastName": "Schumer",
          "profilePic": {
            "imageUrl": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "imageId": "none"
          },
          "location": {
            "country": "Israel",
            "city": "Tel Aviv",
            "lat": 32.065,
            "lng": 34.776
          }
        },
        "type": "Offering", 
        "title": "Middle Eastern Cuisine",
        "subTitle": "Can make or teach you how to make",
        "description": "Sick of your own cooking? Try some of my family recipes. My Mom is Persian, my father Iraqi- this is the best food in the world. I can teach you in person or over the internet. Or I can make you a 3 course meal if you're in the area.",
        "tags": ["Cooking", "Middle Eastern", "Food", "Instruction", "Classes"],
        "thumbnail": {"imageUrl": "https://www.destinationiran.com/wp-content/uploads/2011/01/Iranian-Food-Restaurants.jpg", "imageId": "none"}
      },
    ]
    this.perfectTrade = false;
    
    this.tagsForSearch = [];
    this.tradesByTags = [];
    this.searchType = 'people'
    this.allTags = []
   
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
    //   allTags: observable,
      tagsForSearch: observable,
      tradesByTags: observable,
      searchType: observable,
    //   getTags: action,
      handleFirstName: action,
      hendleLocation:action,
      // tagsForSearch: observable,
      // tradesByTags: observable,
      initialSearch: action,
      allTags: observable,
      getAllTags: action
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

  async getAllTags() {
    const tags = await axios.get(`http://localhost:3001/getTags`);
    this.allTags = tags.data
  }

  async initialSearch(city, country) {
    const tradesResults = await axios.get(`http://localhost:3001/search/trade?searchSeeking=null&searchOffering=null&searchCity=${city}&searchLocation=${country}`);
    // this.tradesResults = tradesResults.data;
      

    const usersResults = await axios.get(`http://localhost:3001/search/userbylocation?searchFirst=null&searchLast=null&searchCity=${city}&searchCountry=${country}`)
    // this.usersResults = usersResults.data
    
  }
}