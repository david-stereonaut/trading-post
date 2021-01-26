import { Card, CardMedia, Paper, Typography, Divider, makeStyles } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import Review from './Review';

const useStyles = makeStyles(() => ({
  reviewsContainer: {
    boxSizing:'border-box',
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: 10
    }
  },
}))

const UserReviews = inject('UserStore')(observer((props) =>  {

  const { UserStore, user } = props

  const classes = useStyles()

  return (
    <Paper className={classes.reviewsContainer}>
      <Typography variant="h6">Reviews:</Typography>
      {user.reviews && user.reviews.length > 0 ? user.reviews.map(r => <Review review={r} />) : <Typography>User has no reviews yet</Typography>}
    </Paper>
  )
}))

export default UserReviews