import { observer, inject } from 'mobx-react'
import './Profile.scss'


const Profile = inject('UserStore', 'ProfileStore')(observer((props) =>  {

  const { UserStore, ProfileStore } = props

  return (
    <div id="profile-container">

    </div>
  )
}))

export default Profile