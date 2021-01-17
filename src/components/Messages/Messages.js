import { observer, inject } from 'mobx-react'
import './Messages.scss'


const Messages = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  return (
    <div id="messages-container">

    </div>
  )
}))

export default Messages