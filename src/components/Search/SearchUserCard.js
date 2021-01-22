import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton, Icon } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Tag from '../Tag'
import { makeStyles } from '@material-ui/styles'
import barterIcon from '../../assets/noun_Work for Food_97466.svg'
import { TradeIcon } from '../TradeIcon'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  card:{
    '& .MuiIconButton-root': {
      display: 'none',
      fontSize: 20
    },
    '&:hover': {
      '& .MuiIconButton-root': {
        display: 'inline-block'
      },
    },
  },
  editIcon: {
    fontSize: 18
  }
}))


const SearchUserCard = inject('GeneralStore', 'SearchStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, SearchStore, UserStore, user, showMap, userId } = props

  const classes = useStyles()


  return (
    <Paper>
      <div className={`${classes.card} profile-trade-card`} >
        <Card style={{width:125}}>
          <CardMedia style={{height: 125}}
            image={user.profilePic.imageUrl}
            title="Trade Thumbnail"
          />
        </Card>
        <div className="middle-section">
          <div className={classes.cardTitle}>
            <Typography variant="body1">{user.first} {user.last}</Typography>
          </div>
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">{user.city}, {user.country}</Typography>
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">{user.description} Many descriptions are empty so I am hard coding this so you can see what it will look like. I do think you should limit it in length to a few lines, same with the trade card description. Maybe it can be expanded or scroll down.</Typography>

          <div className="trade-card-tags">Offering: 
            {user.offeringTags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
          <div className="trade-card-tags">Seeking: 
            {user.seekingTags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
        </div>
        <Button startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button>
        <Button >View profile</Button>
      </div>
    </Paper>
  )
}))

export default SearchUserCard