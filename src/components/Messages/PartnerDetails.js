import { observer, inject } from 'mobx-react'

const PartnerDetails = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props;

    const partner = props.partner;

    const chooseCon = () => MessagesStore.chooseCon(props.conId);

    return (
        <div className = "partner" onClick = {chooseCon}>
            <img src = {partner.profilePic} className = "partner-pic"/>
            <h4 className = "partner-name">{`${partner.firstName} ${partner.lastName}`}</h4>
        </div>
    )
}))

export default PartnerDetails;