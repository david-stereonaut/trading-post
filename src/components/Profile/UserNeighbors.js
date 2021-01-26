import { Card, CardMedia, Paper, Typography, Divider, makeStyles, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import Photo from './Photo'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import MapUserCard from './../Search/MapUserCard'

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

const UserNeighbors = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, user, editable, GeneralStore } = props

  const { userId } = useParams()

  const classes = useStyles()

  // useEffect(()=> {

  // }, [user.seeking, user.offering])

//   let neighbors = user.neighbors && user.neighbors.length > 0 ? user.tradeCards.filter(c => c.type === 'Offering') : undefined


  return (
    <Paper className={classes.tradesContainer}>
      {/* <div className={classes.tradeTitle}>
        <Typography variant="h5" align="center">Neighbors</Typography>
      </div> */}
      {/* <Typography variant="h6">Neighbors:</Typography> */}
      <div className="user-trades-container">
    <div className={classes.container}>
      {user.neighbors && user.neighbors.length > 0 ? (user.neighbors.map(neighbor => <MapUserCard user={neighbor} />)) : <Typography >No neighbors yet</Typography>}
    </div>
 </div>
      {/* <Typography variant="h6">Trade requests:</Typography>
      <div className="user-trades-container">
        {seeking && seeking.length > 0 ? (seeking.map((trade) => <TradeCard key={trade._id} type='profile' trade={trade} editable={editable} />)) : <Typography >User has no trades</Typography>}
      </div>
      {editable && <AddTradeCard />} */}
    </Paper>
  )
}))

export default UserNeighbors