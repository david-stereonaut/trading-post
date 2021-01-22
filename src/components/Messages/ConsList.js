import { observer, inject } from 'mobx-react';
import PartnerDetails from './PartnerDetails';

const ConsList = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props

    return (
        <div id="cons-list">
            <h2 className = 'category-title' id = {`${MessagesStore.category.split(' ')[0]}-title`}>{MessagesStore.category}</h2>
            {MessagesStore.displayedCons.map((d, index) => <PartnerDetails key = {index} conId = {d._id} partner = {d.users.find(u => u._id !== MessagesStore.userId)} status = {d.status} lastMessage = {d.messages[d.messages.length - 1].body}/>)}
        </div>
    )
}))

export default ConsList;