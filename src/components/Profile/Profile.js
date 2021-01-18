import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Profile.scss'
import UserInfo from './UserInfo'
import UserPhotos from './UserPhotos'
import UserContent from './UserContent'
import UserTrades from './UserTrades'
import { useParams } from 'react-router-dom'
import { Divider } from '@material-ui/core'


const Profile = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, GeneralStore } = props

  const { userId } = useParams()

  let user = {}

  user = userId === UserStore.user._id ? UserStore.user : UserStore.watchedUser

  useEffect(() => {
    GeneralStore.handleTabChange('', 0)
  })

  useEffect(() => {
    UserStore.fetchWatchedUser(userId)
  }, [])


  return user.firstName ? (
    <div id="profile-container">
      <UserInfo />
      <div className="profile-middle-section">
        <UserTrades />
      </div>
      <div className="profile-right-section">
        <UserPhotos />
        <UserContent />
      </div>
    </div>
  ) : <p>loading user</p>
}))

export default Profile