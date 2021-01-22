import { observer, inject } from 'mobx-react'
const moment = require('moment');

const Message = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props
  const message = props.message;
  const messageTime = moment(message.message_time).format('DD/MM/YYYY, HH:mm');

  let type = '';
  switch(message.senderId) {
    case MessagesStore.userId: type = 'user-message';
    break;
    case 'system message': type = 'system-message';
    break;
    default: type = 'partner-message';
    break;
  }

  return (
    <div id = "Message" className = {`message ${type}`}>
        <p className = "message-text">{message.senderId === 'system message' && <span className = "system-inform">System message: </span>}{message.body}</p>
        {message.senderId !== 'system message' && <p className = "message-time">{messageTime}</p>}
    </div>
  )
}))

export default Message;