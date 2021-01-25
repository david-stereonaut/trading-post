import { Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import PartnerDetails from './PartnerDetails';

const ConsList = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props

    return (
        <div style={{marginTop: 10}}>
            <Typography variant='h5'>{MessagesStore.category}</Typography>
            {MessagesStore.displayedCons.map((d, index) => <PartnerDetails key = {index} conId = {d._id} partner = {d.users.find(u => u._id !== MessagesStore.userId)} status = {d.status} lastMessage = {d.messages[d.messages.length - 1].body}/>)}
        </div>
    )
}))

export default ConsList;