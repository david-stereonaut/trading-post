import { observer, inject } from 'mobx-react'
import MessagesContainer from './MessagesContainer';

const TextPopup = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props;
    const conversation = MessagesStore.userCons[0] ? MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId): null;
    const status = conversation ? conversation.status : null;
    const firstSender = conversation ? conversation.messages[0].senderId : null;
    const partnerFirstName = MessagesStore.currentConId && MessagesStore.userCons[0] ? conversation.users.find(u => u._id !== MessagesStore.userId).firstName : 'your partner';

    const updateAndClosePopup = () => MessagesStore.updateAndClosePopup('Declined', 'textPopup');

    const closePopup = () => MessagesStore.closePopup('textPopup');

    const typeDeclineMessage = e => MessagesStore.typeDeclineMessage(e.target.value);

    return (
        <div id = {MessagesStore.textPopup ? "visible-text-popup" : "hidden-text-popup"}>
            <h3 id = "text-popup-text">Do you want to leave {partnerFirstName} a message?</h3>
            <input id = "text-popup-input" value = {MessagesStore.declineMessage} onChange = {typeDeclineMessage}/>
            <button className = "pop-up-button agree-button" onClick = {updateAndClosePopup}>Continue</button>
            <button className = "pop-up-button cancel-button" onClick = {closePopup}>Cancel</button>
        </div>
    )
}))

export default TextPopup;