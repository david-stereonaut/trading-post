import { observer, inject } from 'mobx-react';
import PartnerDetails from './PartnerDetails';

const ConsList = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props;
    const userCons = MessagesStore.userCons;

        let consToDisplay = [];
        switch (MessagesStore.category) {
            case 'All barters': consToDisplay = userCons;
            break;
            case 'Requests': consToDisplay = userCons.filter(u => u.status === 'Pending' && u.messages[0].senderId === MessagesStore.userId);
            break;
            case 'Offers': consToDisplay = userCons.filter(u => u.status === 'Pending' && u.messages[0].senderId !== MessagesStore.userId);
            break;
            case 'Active barters': consToDisplay = userCons.filter(u => u.status === 'Active');
            break;
            case 'Completed barters': consToDisplay = userCons.filter(u => u.status === 'Completed');
            break;
            case 'Cancelled barters': consToDisplay = userCons.filter(u => u.status === 'Cancelled' || u.status === 'Declined');
            break;  
            case 'Declined barters': consToDisplay = userCons.filter(u => u.status === 'Cancelled' || u.status === 'Declined');
            break;  
        }

    return (
        <div id="cons-list">
            <h2 className = 'category-title' id = {`${MessagesStore.category.split(' ')[0]}-title`}>{MessagesStore.category}</h2>
            {consToDisplay.map((d, index) => <PartnerDetails key = {index} conId = {d._id} partner = {d.users.find(u => u._id !== MessagesStore.userId)} status = {d.status} lastMessage = {d.messages[d.messages.length - 1].body} partnerTyping = {d.partnerTyping}/>)}
        </div>
    )
}))

export default ConsList;