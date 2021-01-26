import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton, Icon } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Tag from '../Tag'
import { makeStyles } from '@material-ui/styles'
import barterIcon from '../../assets/noun_Work for Food_97466.svg'
import { TradeIcon } from '../TradeIcon'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useHistory } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    '& > *': {
      margin: 15
    },
  },
  bottomSection: {
    display: 'flex',
    direction: 'row',
    '& > *': {
      marginLeft:15
    },
    width: '100%',
    justifyContent: 'center'
  },
  buttons: {
    display: 'flex',
    direction: 'row',
    '& > *': {
      marginLeft:15
    },
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 'auto',
    maxWidth: 200
  },
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
}))

// line 57 will be user's opposite tags, but didn't do logic yet, so now you just have 2 sets of the same tags - says seeking now, will be logic for seeking/offering

const MapUserCard = inject('GeneralStore', 'SearchStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, SearchStore, UserStore, user, showMap, userId } = props

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
    <Paper style={{marginBottom: 15, padding: 15}}>
      <div className={classes.card}>
        {user.profilePic && 
        <Card style={{width:125, flexShrink: 0, height: 125,}}>
          <CardMedia style={{height: 125}}
            image={user.profilePic.imageUrl}
            title="Trade Thumbnail"
          />
        </Card>}
        <div className={classes.text}>
          <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>
          {user.location && user.location.city &&  <Typography variant="subtitle1" style={{fontSize: 12}} color="textSecondary">{`${user.location.city}, ${user.location.country}`}</Typography>}
          {UserStore.isNeighbor(user._id) &&  <Typography variant="subtitle1" style={{ fontSize: 12 }} color="textSecondary">Neighbor</Typography>}
          <Typography variant="body1" style={{fontSize: 14, marginTop: 15}} paragraph={true}>{user.description}</Typography>
        </div>
        <div>
        <Typography variant="subtitle2">Seeking</Typography>
        {seekTags ? user.seekingTags.map(tag => <Tag tag={tag} />) : [...user.seekingTags].splice(0, 3).map(tag => <Tag tag={tag} />)}
        {!seekTags ? <IconButton size="small" onClick={() => setSeekTags(!seekTags)}><ExpandMoreIcon /></IconButton> : <IconButton size="small" onClick={() => setSeekTags(!seekTags)}><ExpandLessIcon /></IconButton>}
        <Typography variant="subtitle2">Offering</Typography>
        {offerTags ? user.offeringTags.map(tag => <Tag tag={tag} />) : [...user.offeringTags].splice(0, 3).map(tag => <Tag tag={tag} />)}
        {!offerTags ? <IconButton size="small" onClick={() => setOfferTags(!offerTags)}><ExpandMoreIcon /></IconButton> : <IconButton size="small" onClick={() => setOfferTags(!offerTags)}><ExpandLessIcon /></IconButton>}
        </div>
      </div>
      <div className={classes.bottomSection}>
        <div className={classes.buttons}>
          <Button startIcon={<PersonIcon />} onClick={redirectToProfile} color="secondary" variant="contained">More</Button>
          <Button startIcon={<TradeIcon />} onClick={startTrade} color="secondary" variant="contained">Trade!</Button>
        </div>
      </div>
    </Paper>
  )
}))

export default MapUserCard