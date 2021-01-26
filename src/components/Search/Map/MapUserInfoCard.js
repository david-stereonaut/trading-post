import { observer, inject } from 'mobx-react'
import { useCallback, useEffect, useState, } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Card, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import Tag from '../../Tag';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
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

const MapUserInfoCard = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) =>  {
  
  const {user, GeneralStore} = props

  const [seekTags, setSeekTags] = useState(false)
  const [offerTags, setOfferTags] = useState(false)

  const classes = useStyles()

  
  const history = useHistory()

  const redirectToProfile = () => {
    history.push(`/profile/${user._id}`)
  }

  const startTrade = () => {
    GeneralStore.setStartTradeUserId(user._id)
    GeneralStore.setStartTrade(null)
    GeneralStore.setStartTradeDialog(true)
  }


  return (
    <div className={classes.mainContainer}>
      <div className={classes.titles}>
        <Typography className={classes.cardTitle} variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
      </div>
      <div className={classes.content}>
        <Card style={{width:120, flexShrink: 0, height: 120}}>
          <CardMedia style={{height: 120}}
            image={user.profilePic ? user.profilePic.imageUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
          />
        </Card>
        <div>
        <Typography paragraph={true} >{user.description}</Typography>
        <Typography variant="subtitle2">Seeking</Typography>
        {seekTags ? user.seekingTags.map(tag => <Tag tag={tag} />) : [...user.seekingTags].splice(0, 3).map(tag => <Tag tag={tag} />)}
        {!seekTags ? <IconButton size="small" onClick={() => setSeekTags(!seekTags)}><ExpandMoreIcon /></IconButton> : <IconButton size="small" onClick={() => setSeekTags(!seekTags)}><ExpandLessIcon /></IconButton>}
        <Typography variant="subtitle2">Offering</Typography>
        {offerTags ? user.offeringTags.map(tag => <Tag tag={tag} />) : [...user.offeringTags].splice(0, 3).map(tag => <Tag tag={tag} />)}
        {!offerTags ? <IconButton size="small" onClick={() => setOfferTags(!offerTags)}><ExpandMoreIcon /></IconButton> : <IconButton size="small" onClick={() => setOfferTags(!offerTags)}><ExpandLessIcon /></IconButton>}
        </div>
      </div>
      <div>
        <Button startIcon={<PersonIcon />} onClick={redirectToProfile} >More</Button>
        <Button startIcon={<TradeIcon />} onClick={startTrade} >Trade!</Button>
      </div>
    </div>
)
}))

export default MapUserInfoCard