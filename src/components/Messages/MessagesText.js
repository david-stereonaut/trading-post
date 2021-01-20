import { observer, inject } from 'mobx-react'

const MessagesText = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;

  return (
    <div id = "messages-text">
        <h1>text</h1>
    </div>
  )
}))

export default MessagesText;