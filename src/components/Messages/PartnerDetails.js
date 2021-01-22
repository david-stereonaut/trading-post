import { observer, inject } from 'mobx-react'

const PartnerDetails = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props;

    const partner = props.partner;
    const shortedMessage = props.lastMessage.length > 34 ? props.lastMessage.substring(0, 33) + '...' : props.lastMessage

    const chooseCon = () => MessagesStore.chooseCon(props.conId);

    return (
        <div className = "partner" onClick = {chooseCon}>
            <img src = {partner.profilePic.imageUrl} className = "partner-pic"/>
            <h4 className = "partner-name">{`${partner.firstName} ${partner.lastName}`}</h4>
            {MessagesStore.category !== 'All barters' && <h5 className = 'con-status'>{shortedMessage}</h5>}
            {MessagesStore.category === 'All barters' && <h5 className = 'con-status'>{props.status}</h5>}
        </div>
    )
}))

export default PartnerDetails;