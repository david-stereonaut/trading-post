import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton, Icon } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Tag from '../Tag'
import { makeStyles } from '@material-ui/styles'
import barterIcon from '../../assets/noun_Work for Food_97466.svg'
import { TradeIcon } from '../TradeIcon'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
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
    marginLeft: 5
  },
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
}))

// line 57 will be user's opposite tags, but didn't do logic yet, so now you just have 2 sets of the same tags - says seeking now, will be logic for seeking/offering

const MapUserCardOld = inject('GeneralStore', 'SearchStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, SearchStore, UserStore, user, showMap, userId } = props

  const [seekTags, setSeekTags] = useState(false)
  const [offerTags, setOfferTags] = useState(false)

  const classes = useStyles()

  return (
    <Paper style={{marginBottom: 15, padding: 15}}>
      <div className={classes.card}>
        {user.profilePic && 
        <Card style={{width:125, flexShrink: 0, height: 125}}>
          <CardMedia style={{height: 125}}
            image={user.profilePic.imageUrl}
            title="Trade Thumbnail"
          />
        </Card>}
        <div className={classes.text}>
          <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">{`${user.location.city}, ${user.location.country}`}</Typography>
          <Typography variant="body1" style={{fontSize: 14}} paragraph={true}>{user.description}</Typography>
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
          <Button href={`/profile/${user._id}`} color="secondary" variant="contained">Show profile</Button>
          <Button startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button>
        </div>
      </div>
    </Paper>
  )
}))

export default MapUserCardOld