import { Button, makeStyles } from '@material-ui/core';
import { observer, inject } from 'mobx-react'

const useStyles = makeStyles(() => ({
  buttons: {
    marginLeft: 'auto',
    '& > *': {
      marginLeft: 15
    }
  }
}))

const Buttons = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId);
  const usersReviewed = MessagesStore.userCons[0] ? conversation.usersReviewed : null;
  const status = MessagesStore.userCons[0] ? conversation.status : null;
  const firstSender = MessagesStore.userCons[0] ? conversation.messages[0].senderId : null;

  const popUpReview = () => MessagesStore.popUpReview();

  const revealGeneralPopup = () => MessagesStore.revealGeneralPopup();

  const revealTextPopup = () => MessagesStore.revealTextPopup();

  const classes = useStyles()

  return (
    <div className={classes.buttons}>
        {status === "Active" && <Button color='primary' variant='contained' className = 'status-but' id = 'complete-but' onClick = {popUpReview}>Complete</Button>}
        {status === "Active" && <Button color='secondary' variant='contained' className = 'status-but' id = 'cancel-but' onClick = {revealGeneralPopup}>Cancel barter</Button>}
        {status === "Pending" && firstSender !== MessagesStore.userId && <Button color='primary' variant='contained' className = 'status-but' id = 'accept-but' onClick = {revealGeneralPopup}>Accept</Button>}
        {status === "Pending" && firstSender !== MessagesStore.userId && <Button color='secondary' variant='contained' className = 'status-but' id = 'decline-but' onClick = {revealTextPopup}>Decline</Button>}
        {status === "Pending" && firstSender === MessagesStore.userId && <Button color='secondary' variant='contained' className = 'status-but' id = 'cancel-req-but' onClick = {revealGeneralPopup}>Cancel request</Button>}
        {status === "Completed" && !usersReviewed.includes(MessagesStore.userId) && <Button color='primary' variant='contained' className = 'status-but' id = 'complete-but' onClick = {popUpReview}>Add Review</Button>}
        {status === "Completed" && <Button color='primary' variant='contained' className = 'status-but' id = 'req-new-but'>Request new barter</Button>}
    </div>
  )
}))

export default Buttons;