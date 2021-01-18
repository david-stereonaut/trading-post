import { Card, CardMedia, Paper, Typography, Divider } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import Photo from './Photo'


const UserPhotos = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  return (
    <Paper style={{marginTop: '2vh', boxSizing:'border-box', padding: 15}}>
      <Typography variant="h6">Photos:</Typography>
      <div className="user-photos-container">
        {UserStore.user.images.map((imgUrl, ind) => <Photo key={ind} imgUrl={imgUrl} />)}
      </div>
    </Paper>
  )
}))

export default UserPhotos