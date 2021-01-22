import { observer, inject } from 'mobx-react'
import ConHeader from "./ConHeader";
import MessagesText from './MessagesText';
import TypeBar from "./TypeBar";

const MessagesContainer = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props
  const conStatus = MessagesStore.currentConId && MessagesStore.displayedCons[0] ? MessagesStore.displayedCons.find(d => d._id === MessagesStore.currentConId).status : null;

    return (
        <div id = "messages-div">
            {MessagesStore.currentConId && <ConHeader/>}
            {MessagesStore.currentConId && <MessagesText/>}
            {MessagesStore.currentConId && conStatus === 'Active' && <TypeBar/>}
        </div>
    )
}))

export default MessagesContainer;