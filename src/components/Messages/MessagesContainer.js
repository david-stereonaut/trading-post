import { observer, inject } from 'mobx-react'
import ConHeader from "./ConHeader";
import MessagesText from './MessagesText';
import TypeBar from "./TypeBar";

const MessagesContainer = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

    return (
        <div id = "messages-div">
            {MessagesStore.currentConId && <ConHeader/>}
            {MessagesStore.currentConId && <MessagesText/>}
            {MessagesStore.currentConId && <TypeBar/>}
        </div>
    )
}))

export default MessagesContainer;