import { Card, CardMedia, Paper, Typography, Divider, makeStyles, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import Photo from './Photo'
import TradeCard from '../Cards/TradeCard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import AddTradeCard from './Edits/AddTradeCard';

const useStyles = makeStyles((theme) => ({
  tradesContainer: {
    marginTop: '2vh',
    boxSizing:'border-box',
    padding: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  tradeTitle: {
    '& button': {
      display: 'none'
    },
    '&:hover': {
      '& button': {
        display: 'inline-block'
      },
    },
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  }
}))

const UserTrades = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, user, editable, GeneralStore } = props

  const { userId } = useParams()

  const classes = useStyles()

  const openEdit = () => {
    GeneralStore.handleEditTrade('editTradeImageUrl', '')
    GeneralStore.handleEditTrade('editTradeImageId', '')
    GeneralStore.handleEditTrade('editTradeTitle', '')
    GeneralStore.handleEditTrade('editTradeSubTitle', '')
    GeneralStore.handleEditTrade('editTradeDescription', '')
    GeneralStore.handleEditTrade('editTradeType', 'Offering')
    GeneralStore.handleEditTrade('editTradeId', '')
    GeneralStore.handleAddTradeCardDialog()
  }

  // useEffect(()=> {

  // }, [user.seeking, user.offering])

  let offering = user.tradeCards && user.tradeCards.length > 0 ? user.tradeCards.filter(c => c.type === 'Offering') : undefined
  let seeking = user.tradeCards && user.tradeCards.length > 0 ? user.tradeCards.filter(c => c.type === 'Seeking') : undefined

  return (
    <Paper className={classes.tradesContainer}>
      <div className={classes.tradeTitle}>
        <Typography variant="h5" align="center">Trades</Typography>
        {editable && <IconButton size="small" onClick={openEdit} ><AddIcon /></IconButton>}
      </div>
      <Typography variant="h6">Offers:</Typography>
      <div className="user-trades-container">
        {offering && offering.length > 0 ? (offering.map((trade) => <TradeCard key={trade._id} type='profile' trade={trade} editable={editable} />)) : <Typography >User has no offers</Typography>}
      </div>
      <Typography variant="h6">Seeks:</Typography>
      <div className="user-trades-container">
        {seeking && seeking.length > 0 ? (seeking.map((trade) => <TradeCard key={trade._id} type='profile' trade={trade} editable={editable} />)) : <Typography >User has no trades</Typography>}
      </div>
      {editable && <AddTradeCard />}
    </Paper>
  )
}))

export default UserTrades