import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Profile.scss'
import UserInfo from './UserInfo'
import UserPhotos from './UserPhotos'
import UserContent from './UserContent'


const Profile = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, GeneralStore } = props

  useEffect(() => {
    GeneralStore.handleTabChange('', 0)
  })

  return (
    <div id="profile-container">
      <UserInfo />
      <div className="profile-middle-section">
        <UserPhotos />
      </div>
      <div className="profile-right-section">
        <UserContent />
      </div>
    </div>
  )
}))

export default Profile