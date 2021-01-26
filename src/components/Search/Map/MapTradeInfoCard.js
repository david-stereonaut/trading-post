import { observer, inject } from 'mobx-react'
import { useCallback, useEffect, useState, } from 'react'

import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Card, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import { TradeIcon } from '../../TradeIcon'

const useStyles=makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: 10
    }
  },
  cardTitle: {
    alignSelf: 'center'
  }
}))

const MapTradeInfoCard = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) =>  {
  
  const {trade, GeneralStore} = props

  const classes = useStyles()

  const history = useHistory()

  const redirectToProfile = () => {
    history.push(`/profile/${trade.user_id._id}`)
  }

  const startTrade = () => {
    GeneralStore.setStartTradeUserId(trade.user_id._id)
    GeneralStore.setStartTrade(trade)
    GeneralStore.setStartTradeDialog(true)
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.titles}>
        <Typography variant="subtitle2">{trade.type}</Typography>
        <Typography className={classes.cardTitle} variant="h6">{trade.title}</Typography>
        <Typography className={classes.cardTitle} color="textSecondary" variant="subtitle2">{trade.subTitle}</Typography>
      </div>
      <div className={classes.content}>
        <Card style={{width:120, flexShrink: 0, height: 120}}>
          <CardMedia style={{height: 120}}
            image={trade.thumbnail.imageUrl}
            title="Interesting stuff"
          />
        </Card>
        <Typography >{trade.description}</Typography>
      </div>
      <div>
        <Button startIcon={<PersonIcon />} onClick={redirectToProfile} >More</Button>
        <Button startIcon={<TradeIcon />} onClick={startTrade} >Trade!</Button>
      </div>
    </div>
)
}))

export default MapTradeInfoCard