import { Card, CardMedia, Paper, Typography, Divider } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';


const UserInfo = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  return (
    <Paper style={{}}>
    <div id="user-info">
      <Card style={{width:175}}>
        <CardMedia style={{height: 175}}
          image={UserStore.user.profilePic}
          title="User"
        />
      </Card>
        <Typography variant="h5">{UserStore.user.firstName} {UserStore.user.lastName}</Typography>
      <div>
        <Typography variant="body2" color="textSecondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
      <Divider variant="middle" />
      </div>
      <div style={{marginTop: 10}}>
      <Typography variant="body1" style={{alignSelf: 'flex-start'}}>Offering</Typography>
        <div className="user-tag-container">
        {UserStore.user.offeringTags.map(tag => <Tag key={tag} tag={tag} />)}
        </div>
      </div>
      <div style={{marginTop: 10, marginBottom: 10}}>
      <Typography variant="body1" style={{alignSelf: 'flex-start'}}>Seeking</Typography>
        <div className="user-tag-container">
        {UserStore.user.seekingTags.map(tag => <Tag key={tag} tag={tag} />)}
        </div>
      </div>
    </div>
    </Paper>
  )
}))

export default UserInfo