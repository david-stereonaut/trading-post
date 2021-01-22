import { observer, inject } from 'mobx-react'

const Buttons = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.displayedCons.find(d => d._id === MessagesStore.currentConId);
  const status = MessagesStore.displayedCons[0] ? conversation.status : null;
  const firstSender = MessagesStore.displayedCons[0] ? conversation.messages[0].senderId : null;

  const popUpReview = () => MessagesStore.popUpReview();

  const revealGeneralPopup = () => MessagesStore.revealGeneralPopup();

  const revealTextPopup = () => MessagesStore.revealTextPopup();

  return (
    <div id = "buttons">
        {status === "Active" && <button className = 'status-but' id = 'complete-but' onClick = {popUpReview}>Complete</button>}
        {status === "Active" && <button className = 'status-but' id = 'cancel-but' onClick = {revealGeneralPopup}>Cancel barter</button>}
        {status === "Pending" && firstSender !== MessagesStore.userId && <button className = 'status-but' id = 'accept-but' onClick = {revealGeneralPopup}>Accept</button>}
        {status === "Pending" && firstSender !== MessagesStore.userId && <button className = 'status-but' id = 'decline-but' onClick = {revealTextPopup}>Decline</button>}
        {status === "Pending" && firstSender === MessagesStore.userId && <button className = 'status-but' id = 'cancel-req-but' onClick = {revealGeneralPopup}>Cancel request</button>}
        {status === "Completed" && <button className = 'status-but' id = 'req-new-but'>Request new barter</button>}
    </div>
  )
}))

export default Buttons;