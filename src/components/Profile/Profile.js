import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Profile.scss'
import UserInfo from './UserInfo'
import UserPhotos from './UserPhotos'
import UserContent from './UserContent'
import UserTrades from './UserTrades'
import { useParams } from 'react-router-dom'
import { Divider } from '@material-ui/core'
import ProfilePicUpload from './Edits/ProfilePicUpload'


const Profile = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, GeneralStore } = props

  const { userId } = useParams()
  const fetch = async () => {
    await UserStore.fetchUser()
    await UserStore.fetchWatchedUser(userId)

  }

  useEffect(() => {
    fetch()
    GeneralStore.setEditName(false)
  }, [userId])

  let user = {}
  let editable = false
  user = userId === UserStore.user._id ? UserStore.user : UserStore.watchedUser
  editable = userId === UserStore.user._id ? true : false

  useEffect(() => {
    GeneralStore.handleTabChange('', (editable ? 0 : 3))
  }, [])



  return user.firstName ? (
    <div id="profile-container">
      <UserInfo user={user} editable={editable} />
      <div className="profile-middle-section">
        <UserTrades user={user} editable={editable} />
      </div>
      <div className="profile-right-section">
        <UserPhotos user={user} editable={editable} />
        <UserContent user={user} editable={editable} />
      </div>
      {editable && user.firstName ? <ProfilePicUpload /> : null}
    </div>
  ) : <p>loading user</p>
}))

export default Profile