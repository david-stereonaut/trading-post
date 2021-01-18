import { Card, CardMedia, Paper, Typography, Divider, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import Tag from '../Tag';
import { useParams } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';


const UserInfo = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  const { userId } = useParams()

  let user = {}

  let editable = false

  user = userId === UserStore.user._id ? UserStore.user : UserStore.watchedUser

  editable = userId === UserStore.user._id ? true : false

  return (
    <div>
      <Paper style={{}}>
        <div id="user-info">
        <Card style={{width:175, marginTop: '1vh'}}>
          <CardMedia style={{height: 175}}
            image={user.profilePic}
            title="User"
          />
        </Card>
          <Typography variant="h5">{user.firstName} {user.lastName} {editable && <IconButton size="small" style={{display: 'none'}}><EditIcon/></IconButton>}</Typography>
        <div>
          <Typography variant="body2" color="textSecondary">{user.description}</Typography>
        <Divider variant="middle" />
        </div>
        <div style={{marginTop: 10}}>
        <Typography variant="body1" style={{alignSelf: 'flex-start'}}>Offering</Typography>
          <div className="user-tag-container">
          {user.offeringTags.map(tag => <Tag key={tag} tag={tag} editable={editable} />)}
          </div>
        </div>
        <div style={{marginTop: 10, marginBottom: 10}}>
        <Typography variant="body1" style={{alignSelf: 'flex-start'}}>Seeking</Typography>
          <div className="user-tag-container">
          {user.seekingTags.map(tag => <Tag key={tag} tag={tag} editable={editable} />)}

          </div>
        </div>
        </div>
      </Paper>
    </div>
  )
}))

export default UserInfo