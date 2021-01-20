import { Card, CardMedia, Paper, Typography, Divider } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import Photo from './Photo'
import { useParams } from 'react-router-dom';


const UserPhotos = inject('UserStore')(observer((props) =>  {

  const { UserStore, user } = props

  const { userId } = useParams()


  return (
    <Paper style={{ boxSizing:'border-box', padding: 15}}>
      <Typography variant="h6">Photos:</Typography>
      <div className="user-photos-container">
        {user.images.map((img, ind) => <Photo key={ind} imgUrl={img.imageUrl} />)}
      </div>
    </Paper>
  )
}))

export default UserPhotos