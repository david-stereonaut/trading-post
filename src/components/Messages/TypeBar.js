import { observer, inject } from 'mobx-react'

const TypeBar = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;

  const typeMessage = e => MessagesStore.typeMessage(e.target.value);

  const sendByClick = () => MessagesStore.sendMessage();

  const sendByEnter = e => {if (e.keyCode === 13) {MessagesStore.sendMessage()}}

  return (
    <div id = "type-bar-div">
        <input id = "type-bar" value = {MessagesStore.newMessage} placeholder = "New message" onChange = {typeMessage} onKeyDown = {sendByEnter}/>
        <button id = "send-button" onClick = {sendByClick}>SEND</button>
    </div>
  )
}))

export default TypeBar;