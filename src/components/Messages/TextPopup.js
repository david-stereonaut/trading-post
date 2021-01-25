import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core';
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
        <Dialog open = {MessagesStore.textPopup}>
            <DialogContent>
                <DialogContentText>Do you want to leave {partnerFirstName} a message?</DialogContentText>
                <TextField multiline style={{width: '100%'}} label='Write a message, be polite' value = {MessagesStore.declineMessage} onChange = {typeDeclineMessage}/>
            </DialogContent>
            <DialogActions>
                <Button onClick = {closePopup}>Cancel</Button>
                <Button color='primary' onClick = {updateAndClosePopup}>Continue</Button>
            </DialogActions>
        </Dialog>
    )
}))

export default TextPopup;