import { makeStyles, Paper, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
const moment = require('moment');

const useStyles = makeStyles(() => ({
  userMessage:{
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#59B192'
  },
  partnerMessage: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginBottom: 15,
    padding: 10,
  },
  systemMessage: {
    alignSelf: 'center',
    maxWidth: '80%',
    marginBottom: 15,
    padding: 10,
    color: '#7b4b94'
  }
}))

const Message = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props
  const message = props.message;
  const messageTime = moment(message.message_time).format('DD/MM/YYYY, HH:mm');

  let type = '';
  switch(message.senderId) {
    case MessagesStore.userId: type = 'userMessage';
    break;
    case 'system message': type = 'systemMessage';
    break;
    default: type = 'partnerMessage';
    break;
  }

  const classes = useStyles()

  return (
    <Paper id = "Message" className = {classes[type]}>
        <Typography paragraph={type !== 'systemMessage' && true} variant='body1' >{message.senderId === 'system message' && 'System message: '}{message.body}</Typography>
        {message.senderId !== 'system message' && <Typography variant='subtitle2' style={{fontSize: 13, marginBottom: -5}}>{messageTime}</Typography>}
    </Paper>
  )
}))

export default Message;