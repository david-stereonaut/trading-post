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
    // this.usersResults = usersResults.data;
    this.usersResults = [{
      "email": "LiaLevy@pmail.com",
      "password": "LiaRules",
      "firstName": "Lia",
      "lastName": "Levy",
      "profilePic": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Woodworking_Tools_at_the_Women%27s_Woodshop_in_Minneapolis%2C_MN.jpg/220px-Woodworking_Tools_at_the_Women%27s_Woodshop_in_Minneapolis%2C_MN.jpg",
      "https://esmmweighless.com/wp-content/uploads/2019/12/Carolyn-Cooking-Blog.jpg", 
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJDZvwSrdAdHgArNF7X_7w_ATxy8fkY8oAg&usqp=CAU"
  ],
      "location": {
          "country": "Israel",
          "city": "Tel Aviv",
          "street": "Shlomo Hamelech"
      },
      "offeringTags": ["Martial Arts", "Tae Kwon Do", "Cooking", "Woodworking"],
      "seekingTags": ["Languages", "Arabic", "Dog Sitting", "Cooking"],
      "offering": [], 
      "seeking" : [], 
      "conversations": [],
      "content": [],
      "reviews": []
  },
  {
      "email": "AdamSchumer@pmail.com",
      "password": "AdamRules",
      "firstName": "Adam",
      "lastName": "Schumer",
      "profilePic": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "images": ["https://i.imgur.com/EQlitgs.jpg", "https://ak.picdn.net/shutterstock/videos/1012987421/thumb/11.jpg",
          "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/04/10100051/lab-yellow-walking-on-leash.jpg"
      ],
      "location": {
          "country": "Israel",
          "city": "Tel Aviv",
          "street": "Rothschild"
      },
      "offeringTags": ["Child Care", "Music", "Synth", "Bass Guitar", "Oil Painting", "Languages", "Arabic", "Dog Sitting"],
      "seekingTags": ["Languages", "English", "Cat Sitting", "Crocheting", "Pet Care"],
      "offering": [], 
      "seeking" : [], 
      "conversations": [],
      "content": [],
      "reviews": []
  }]
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

  async initialSearch(location) {
    const tradesResults = await axios.get(`http://localhost:3001/search/trade?searchSeeking=${this.searchSeeking}&searchOffering=${this.searchOffering}&searchCity=${this.searchCity}&searchLocation=${location}`);
    // this.tradesResults = tradesResults.data;
    this.tradesResults = [
      {
          "userId": "60045b3619f39a2c9c46c63f",
          "type": "Offering",
          "title": "Base Guitar Lessons",
          "subTitle": "In person or over the internet",
          "description": "You want to learn? I want to teach. Lessons for beginners - intermediate.",
          "tags": [
              "Bass Guitar",
              "Guitar",
              "Music",
              "Classes",
              "In person",
              "Zoom",
              "Instruction"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      },
      {
          "userId": "60045b3619f39a2c9c46c63f",
          "type": "Seeking",
          "title": "Oil Painting",
          "subTitle": "Paint your portrait from a photograph",
          "description": "Looking for someone to sit my sweet and energetic dog Shadow when I go away on vacation.",
          "tags": [
              "Pet Care",
              "Dog Sitting",
              "Dog Walking",
              "Classes",
              "In person",
              "Zoom",
              "Instruction"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      },
      {
          "userId": "60045b3619f39a2c9c46c63f",
          "type": "Offering",
          "title": "Woodworking",
          "subTitle": "Make you something or teach you how to make it yourself",
          "description": "I have a woodworking studio in my home. I do small pieces like birdhouses, tables, and shelves. I can make something for someone in my area or teach you how to make something.",
          "tags": [
              "Woodworking",
              "Furniture Making",
              "Birdhouses",
              "Wooden",
              "Classes",
              "In person",
              "Zoom",
              "Instruction"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      },
      {
          "userId": "60045b3619f39a2c9c46c63f",
          "type": "Offering",
          "title": "Dinner for four",
          "subTitle": "Cook together or I'll cook for you",
          "description": "I love cooking and cooking for other people. I'm happy to cook for you or cook together and I can teach you my favorite recipes. Also happy to swap dinner - we all get sick of our own recipes, I'd love to try yours. I could also teach over the internet.",
          "tags": [
              "Cooking",
              "Dinner",
              "Food",
              "Classes",
              "In person",
              "Zoom",
              "Instruction"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      },
      {
          "userId": "60045b3619f39a2c9c46c63f",
          "type": "Seeking",
          "title": "Beginner Arabic Instruction",
          "subTitle": "Looking for an Arabic teacher - in person or over internet",
          "description": "I would love to learn conversational Arabic. I know the alphabet and some basic vocabulary, and I am learning from an app, but I need someone to practice speaking and verb conjugation.",
          "tags": [
              "Language",
              "Language exchange",
              "Arabic",
              "Classes",
              "In person",
              "Zoom",
              "Instruction"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      },
      {
          "userId": "6004588a19f39a2c9c46c63d",
          "type": "Offering",
          "title": "Pet Sitting",
          "subTitle": "Dog/Cat Sitter/Walker",
          "description": "I love animals. I don't have one of my own, but would love to take care of yours while you're away, either at my place or yours.",
          "tags": [
              "Pet Care",
              "Dog Sitting",
              "Cat Sitting",
              "Dog Walking"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      }]
  }
}