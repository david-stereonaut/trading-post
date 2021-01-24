import { observer, inject } from 'mobx-react'
import Message from './Message';

const MessagesText = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId);
  const messages = MessagesStore.userCons[0] ? conversation.messages : null;

  return (
    <div id = "messages-text">
        {messages && messages.map((m, index) => <Message key = {index} message = {m}/>)}
    </div>
  )
}))

export default MessagesText;