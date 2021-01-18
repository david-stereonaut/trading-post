import { observable, action, computed, makeObservable } from  'mobx'

export class UserStore {
  constructor() {
    this.user = {
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
      }
    

    makeObservable(this, {
      user: observable
    })
  }



}
