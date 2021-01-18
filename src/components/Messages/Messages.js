import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Messages.scss'


const Messages = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, GeneralStore } = props

  useEffect(() => {
    GeneralStore.handleTabChange('', 2)
  })

  return (
    <div id="messages-container">

    </div>
  )
}))

export default Messages