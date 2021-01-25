import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
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
        default: text = ''; newStatus = '';
    }

    const updateAndClosePopup = () => MessagesStore.updateAndClosePopup(newStatus, 'generalPopup');

    const closePopup = () => MessagesStore.closePopup('generalPopup');

    return (
        <Dialog open = {MessagesStore.generalPopup} onClose={closePopup}>
            <DialogContent>
                <Typography>{text}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick = {closePopup}>Cancel</Button>
                <Button color='primary' onClick = {updateAndClosePopup}>Continue</Button>
            </DialogActions>
        </Dialog>
    )
}))

export default GeneralPopup;