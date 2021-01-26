import { Card, CardMedia, Paper, Typography, Divider, Avatar, makeStyles } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {margin: 10},
    alignItems: 'center'
  }
}))

const Review = inject('UserStore')(observer((props) =>  {

  const { UserStore, review } = props

  const classes = useStyles()

  return (
    <Paper className={classes.container}>
      <Avatar src={review.reviewer.profilePic.imageUrl} alt={`${review.reviewer.firstName} ${review.reviewer.lastName}`} />
      <Typography><span style={{fontWeight: 500}}>{`${review.reviewer.firstName} ${review.reviewer.lastName}:`}</span>{` ${review.review}`}</Typography>
    </Paper>
  )
}))

export default Review