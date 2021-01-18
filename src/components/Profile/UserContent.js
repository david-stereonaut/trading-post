import { Card, CardMedia, Paper, Typography, Divider } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';


const UserContent = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  return (
    <Paper style={{}}>
      <Typography variant="h6">Content:</Typography>
    </Paper>
  )
}))

export default UserContent