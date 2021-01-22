import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Messages.scss'
import ListContainer from './ListContainer'
import MessagesContainer from './MessagesContainer'
import ReviewPopup from './ReviewPopup';
import GeneralPopup from './GeneralPopup';
import TextPopup from './TextPopup';


const Messages = inject('MessagesStore', 'UserStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const { UserStore } = props;

  useEffect(() => {
    MessagesStore.getCons(MessagesStore.category);
  }, []);

  return (
    <div id="messages-container">
      <ListContainer/>
      <MessagesContainer/>
      <ReviewPopup/>
      <GeneralPopup/>
      <TextPopup/>
    </div>
  )
}))

export default Messages