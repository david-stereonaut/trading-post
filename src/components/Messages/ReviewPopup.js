import { observer, inject } from 'mobx-react'

const ReviewPopup = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId);
  const partnerFirstName = MessagesStore.currentConId && MessagesStore.userCons[0] ? conversation.users.find(u => u._id !== MessagesStore.userId).firstName : 'your partner';

  const reviewAndComplete = () => MessagesStore.updateAndClosePopup('Completed', 'reviewPopup');

  const closePopup = () => MessagesStore.closePopup('reviewPopup')

  return (
    <div id = {MessagesStore.reviewPopup ? "visible-review-Popup" : "hidden-review-popUp"}>
        <h1 id = "review-Popup-title">Barter completed!</h1>
        <h3 id = "review-Popup-second-title">Add a review about {partnerFirstName}</h3>
        <input id = "review-input"/>
        <h2>Rate</h2>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i><br/>
        <button className = "pop-up-button agree-button" onClick = {reviewAndComplete}>Send Review</button>
        <button className = "pop-up-button cancel-button" onClick = {closePopup}>Cancel</button>
    </div>
  )
}))

export default ReviewPopup;