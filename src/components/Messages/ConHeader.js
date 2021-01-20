import { observer, inject } from 'mobx-react'

const ConHeader = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

//   real var
//   const partner = MessagesStore.currentConId ? MessagesStore.displayedCons.find(d => d._id === MessagesStore.currentConId).users.find(u => u._id !== MessagesStore.userId) : {}

// dummy data - delete
const dummyPartners = JSON.parse(JSON.stringify([{
    "email": "AdamSchumer@pmail.com",
        "password": "AdamRules",
        "firstName": "Adam",
        "lastName": "Schumer",
        "profilePic": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "images": ["https://i.imgur.com/EQlitgs.jpg", "https://ak.picdn.net/shutterstock/videos/1012987421/thumb/11.jpg",
        "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/04/10100051/lab-yellow-walking-on-leash.jpg"
    ]
}]))
const partner = dummyPartners[0];
// dummy data untill here


  return (
    <div id = "cons-header">
        <img src = {partner.profilePic} id = "current-partner-pic"/>
        <h2 id = "current-partner-name">{`${partner.firstName} ${partner.lastName}`}</h2>
    </div>
  )
}))

export default ConHeader;