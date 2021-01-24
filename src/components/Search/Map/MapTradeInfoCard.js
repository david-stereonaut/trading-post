import { observer, inject } from 'mobx-react'
import { useCallback, useEffect, useState, } from 'react'

import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Card, CardMedia, makeStyles, Typography } from '@material-ui/core';

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
  
  const {trade} = props


  const classes = useStyles()

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
        <Button href={`/profile/${trade.user_id._id}`} >User profile</Button>
      </div>
    </div>
)
}))

export default MapTradeInfoCard