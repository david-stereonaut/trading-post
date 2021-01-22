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
    this.tradesResults = [];
    this.perfectTrade = false;
    
    this.tagsForSearch = [];
    this.tradesByTags = [];
    this.searchType = 'people'
   
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
      hendleLocation:action,
      // tagsForSearch: observable,
      // tradesByTags: observable,
      searchUsers: action,
      searchTrades: action,
      searchPerfectTrades: action,
      searchTradesByTags: action, 
      initialSearch: action
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

  async initialSearch(city, country) {
    const tradesResults = await axios.get(`http://localhost:3001/search/trade?searchSeeking=null&searchOffering=null&searchCity=${city}&searchLocation=${country}`);
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
          "subTitle": "Paint you are portrait from a photograph",
          "description": "Various sizes available depending on trade.",
          "tags": [
              "Painting",
              "Oil painting",
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
      },
      {
          "userId": "6004588a19f39a2c9c46c63d",
          "type": "Offering",
          "title": "MuserIddle Eastern Cuisine",
          "subTitle": "Can make or teach you how to make",
          "description": "Sick of your own cooking? Try some of my family recipes. My Mom is Persian, my father Iraqi- this is the best food in the world. I can teach you in person or over the internet. Or I can make you a 3 course meal if you're in the area.",
          "tags": [
              "Cooking",
              "MuserIddle Eastern",
              "Food",
              "Instruction",
              "Classes"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      },
      {
          "userId": "6004588a19f39a2c9c46c63d",
          "type": "Offering",
          "title": "Bird feeder making",
          "subTitle": "Woodworking class",
          "description": "Want to attract some birds? Build something with your own two hands? I'll teach you how to build your own birdhouse - you supply the materials, I'll supply the know-how. In person or online (If online you'll need your own tools.",
          "tags": [
              "Woodshop",
              "Woodworking",
              "Birdhouse",
              "Bird Feeder",
              "DIY",
              "Instruction",
              "Classes"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      },
      {
          "userId": "6004588a19f39a2c9c46c63d",
          "type": "Seeking",
          "title": "Tai Chi class",
          "subTitle": "or any martial arts, preferably in person",
          "description": "I heard martial arts is good for being present and concentration. I prefer to learn in person, but also open to online. Preferably in the evenings or FruserIdays. Prefer Tai Chi but open to other stuff- barterers can't be choosers.",
          "tags": [
              "Martial Arts",
              "Tai Chi",
              "In Person",
              "Online",
              "Zoom",
              "Exercise",
              "Instruction",
              "Classes"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      },
      {
          "userId": "6004588a19f39a2c9c46c63d",
          "type": "Seeking",
          "title": "Bass Guitar",
          "subTitle": "Music lessons",
          "description": "I have my brother's old bass and I would love to learn. Prefer in person, but I guess online is ok.",
          "tags": [
              "Bass Guitar",
              "Music",
              "In Person",
              "Online",
              "Zoom",
              "Music Lessons",
              "Music Classes",
              "Classes"
          ],
          "thumbnail": {
              "imageURL": "https://c.stocksy.com/a/4TC200/z9/524586.jpg",
              "imageId": null
          }
      }
  ]

    const usersResults = await axios.get(`http://localhost:3001/search/userbylocation?searchFirst=null&searchLast=null&searchCity=${city}&searchCountry=${country}`)
    // this.usersResults = usersResults.data
    this.usersResults = [{
      "email": "LiaLevy@pmail.com",
      "password": "LiaRules",
      "firstName": "Lia",
      "lastName": "Levy",
      "profilePic": {imageUrl:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", imageId: null},
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
  }, 
  {
      "email": "EthanMarx@jahoo.com",
      "password": "EthanRules",
      "firstName": "Ethan",
      "lastName": "Marx",
      "profilePic": "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "images": ["data:image/jpeg;base64,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", 
          "https://linas.kitchen/wp-content/uploads/2019/04/middle-eastern.jpg",
          "https://ana-white.com/sites/default/files/3154824731_1364840461.jpg",
      "https://i.pinimg.com/originals/a6/df/05/a6df059d0598bf96948f3d3932ec7124.jpg"],
      "location": {
          "country": "Israel",
          "city": "Tel Aviv",
          "street": "HaNamer"
      },
      "offeringTags": ["Pet Care", "Dog Sitting","Cat Sitting", "Cooking", "Middle Eastern Cuisine", "Woodworking", "Languages", "Hebrew"],
      "seekingTags": ["Languages", "Arabic", "Martial Arts", "Music Lessons", "Bass Guitar", "Tai Chi", "Cooking", "Indian Food"],
      "offering": [], 
      "seeking" : [], 
      "conversations": [],
      "content": [],
      "reviews": []
  },
  {
      "email": "SofiaBennet@jahoo.com",
      "password": "SofiaRules",
      "firstName": "Sofia",
      "lastName": "Bennet",
      "profilePic": "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "images": ["data:image/jpeg;base64,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",
          "https://i.pinimg.com/originals/74/07/63/740763d6083d8d6f85029acfcfcb171a.jpg",
          "data:image/jpeg;base64,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"],
      "location": {
          "country": "Israel",
          "city": "Jerusalem",
          "street": "Dan St."
      },
      "offeringTags": ["Pet Care", "Dog Sitting","Cat Sitting", "Languages", "English", "Hebrew", "Martial Arts", "Tae Kwon Do"],
      "seekingTags": ["Languages", "Arabic", "Pet Care", "Dog Sitting", "Massages", "Tai Chi", "Cooking", "Middle Eastern Cuisine"],
      "offering": [], 
      "seeking" : [], 
      "conversations": [],
      "content": [],
      "reviews": []
  },
  {
      "email": "DanRosen@jahoo.com",
      "password": "DanRules",
      "firstName": "Dan",
      "lastName": "Rosen",
      "location": {
          "country": "Israel",
          "city": "Jerusalem",
          "street": "Naftali St."
      },
      "profilePic": {"imageUrl":"https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg", "imageId": null},
      "offeringTags": ["Pet Care", "Dog Sitting","Cat Sitting", "Languages", "English", "Dutch", "Plumbing", "Handyman", "Middle Eastern Cuisine"],
      "seekingTags": ["Languages", "Hebrew", "Pet Care", "Dog Sitting", "Cat Sitting", "Oil Painting", "Art"],
      "tradeCards": [], 
  
  },
  {
      "email": "TanyaZimmer@pmail.com",
      "password": "TanyaRules",
      "firstName": "Tanya",
      "lastName": "Zimmer",
      "profilePic": {"imageUrl":"https://images.pexels.com/photos/194446/pexels-photo-194446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "imageId": null},
      "location": {
          "country": "Israel",
          "city": "Jerusalem",
          "street": "Keren HaYesod St."
      },
      "offeringTags": ["Languages", "Hebrew", "Woodworking", "Handyman", "Oil Painting", "Art"],
      "seekingTags": [ "Middle Eastern Cuisine", "Pet Care", "Dog Sitting", "Cat Sitting", "Glassblowing"],
      "tradeCards": [], 
      
  }]
    
  }
}