import { Card, CardMedia, Paper, Typography, Divider } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';


const UserReviews = inject('UserStore')(observer((props) =>  {

  const { UserStore, user } = props

  return (
    <Paper style={{}}>
      <Typography variant="h6">Reviews:</Typography>
    </Paper>
  )
}))

export default UserReviews