import { makeStyles } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import Message from './Message';

const useStyles= makeStyles(() => ({
  container:{
    overflow: 'auto',
    backgroundColor: '#F5F6F8',
    flexGrow: 4,
    padding: 10,
    borderRadius: 10
  },
}))

const MessagesText = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.displayedCons.find(d => d._id === MessagesStore.currentConId);
  const messages = MessagesStore.displayedCons[0] ? conversation.messages : null;

  const classes = useStyles()

  return (
    <div className={classes.container} >
        {messages && messages.map((m, index) => <Message key = {index} message = {m}/>)}
    </div>
  )
}))

export default MessagesText;