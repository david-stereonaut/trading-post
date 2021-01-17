import { observer, inject } from 'mobx-react'
import './Profile.scss'


const UserInfo = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  return (
    <div id="user-info">
      
    </div>
  )
}))

export default UserInfo