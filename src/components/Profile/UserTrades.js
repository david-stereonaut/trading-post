import { Card, CardMedia, Paper, Typography, Divider } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import Photo from './Photo'
import TradeCard from '../Cards/TradeCard';
import { useParams } from 'react-router-dom';


const UserTrades = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  const { userId } = useParams()

  let user = {}

  user = userId === UserStore.user._id ? UserStore.user : UserStore.watchedUser

  return (
    <Paper style={{marginTop: '2vh', boxSizing:'border-box', padding: 15}}>
      <Typography variant="h5" align="center">Trades</Typography>
      <Typography variant="h6">Offers:</Typography>
      <div className="user-trades-container">
        {user.offering.map((trade, ind) => <TradeCard key={ind} type='profile' trade={trade} />)}
      </div>
      <Typography variant="h6">Seeks:</Typography>
      <div className="user-trades-container">
        {user.seeking.map((trade, ind) => <TradeCard key={ind} type='profile' trade={trade} />)}
      </div>
    </Paper>
  )
}))

export default UserTrades