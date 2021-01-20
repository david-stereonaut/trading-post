import { Card, CardMedia, Paper, Typography, Divider } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import Photo from './Photo'
import TradeCard from '../Cards/TradeCard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const UserTrades = inject('UserStore')(observer((props) =>  {

  const { UserStore, user, editable } = props

  const { userId } = useParams()

  return (
    <Paper style={{marginTop: '2vh', boxSizing:'border-box', padding: 15}}>
      <Typography variant="h5" align="center">Trades</Typography>
      <Typography variant="h6">Offers:</Typography>
      <div className="user-trades-container">
        {user.offering.length > 0 ? (user.offering.map((trade) => <TradeCard key={trade._id} type='profile' trade={trade} editable={editable} />)) : <Typography >User has no offers</Typography>}
      </div>
      <Typography variant="h6">Seeks:</Typography>
      <div className="user-trades-container">
        {user.seeking.length > 0 ? (user.seeking.map((trade) => <TradeCard key={trade._id} type='profile' trade={trade} editable={editable} />)) : <Typography >User has no trades</Typography>}
      </div>
    </Paper>
  )
}))

export default UserTrades