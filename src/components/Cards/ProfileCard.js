import { observer, inject } from 'mobx-react'

const ProfileCard = inject('SearchStore')(observer((props) =>  {

  const { SearchStore } = props

  return (
    <div className="profile-card">

    </div>
  )
}))

export default ProfileCard