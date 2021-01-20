import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Messages.scss'
import ListContainer from './ListContainer'
import MessagesContainer from './MessagesContainer'


const Messages = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;

  useEffect(() => {
    //add here function to insert userId
    MessagesStore.getCons(MessagesStore.category);
  }, []);

  return (
    <div id="messages-container">
      <ListContainer/>
      <MessagesContainer/>
    </div>
  )
}))

export default Messages