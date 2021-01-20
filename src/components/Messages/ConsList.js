import { observer, inject } from 'mobx-react';
import PartnerDetails from './PartnerDetails';

const ConsList = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props


    // dummy data - delete
    const dummyPartners = JSON.parse(JSON.stringify([{
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
        "offeringTags": ["Child Care", "Music", "Synth", "Base Guitar", "Oil Painting", "Languages", "Arabic", "Dog Sitting"],
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
        "seekingTags": ["Languages", "Arabic", "Martial Arts", "Music Lessons", "Base Guitar", "Tai Chi", "Cooking", "Indian Food"],
        "offering": [], 
        "seeking" : [], 
        "conversations": [],
        "content": [],
        "reviews": []
    },
    ]));
    // dummy data untill here

    return (
        <div id="cons-list">
            <h2>{MessagesStore.category}</h2>
            {/* real component */}
            {/* {MessagesStore.displayedCons.map((d, index) => <PartnerDetails key = {index} conId = {d._id} partner = {d.users.find(u => u.id !== MessagesStore.userId)}/>)} */}

            {/* dummy component - delete */}
            {dummyPartners.map((d, index) => <PartnerDetails key = {index} conId = {`${dummyPartners.indexOf(d)}`} partner = {d}/>)}
        </div>
    )
}))

export default ConsList;