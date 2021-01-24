import { observer, inject } from 'mobx-react'

const GeneralPopup = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props;
    const conversation = MessagesStore.userCons ? MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId): null;
    const status = conversation ? conversation.status : null;
    const firstSender = conversation ? conversation.messages[0].senderId : null;
    const partnerFirstName = MessagesStore.currentConId && MessagesStore.userCons[0] ? conversation.users.find(u => u._id !== MessagesStore.userId).firstName : 'your partner';



    let text = '';
    let newStatus = '';
    switch (status) {
        case 'Active': 
            text = 'Are you sure you want to cancel the barter?';
            newStatus = 'Cancelled';
        break;
        case 'Pending': 
            text = firstSender === MessagesStore.userId ? 'Cancel request? The request will be deleted' : `Starting barter with ${partnerFirstName}`;
            newStatus = firstSender === MessagesStore.userId ? null : 'Active';
        break;
    }

    const updateAndClosePopup = () => MessagesStore.updateAndClosePopup(newStatus, 'generalPopup');

    const closePopup = () => MessagesStore.closePopup('generalPopup');

    return (
        <div id = {MessagesStore.generalPopup ? "visible-general-popup" : "hidden-general-popup"}>
            <h3 id = "general-popup-text">{text}</h3>
            <button className = "pop-up-button agree-button" onClick = {updateAndClosePopup}>continue</button>
            <button className = "pop-up-button cancel-button" onClick = {closePopup}>Cancel</button>
        </div>
    )
}))

export default GeneralPopup;