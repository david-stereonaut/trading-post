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

// line 57 will be user's opposite tags, but didn't do logic yet, so now you just have 2 sets of the same tags - says seeking now, will be logic for seeking/offering

const SearchTradeCard = inject('GeneralStore', 'SearchStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, SearchStore, UserStore, trade, showMap, userId } = props

  const classes = useStyles()

  return (
    <Paper>
      <div className={`${classes.card} profile-trade-card`} >
        <Card style={{width:125}}>
          <CardMedia style={{height: 125}}
            image={trade.thumbnail.imageUrl}
            title="Trade Thumbnail"
          />
        </Card>
        <div className="middle-section">
          <div className={classes.cardTitle}>
            <Typography variant="body1">{trade.title}</Typography>
          </div>
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">City, Country</Typography>
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">{trade.subTitle}</Typography>
          <Typography variant="body1" style={{fontSize: 14}}  paragraph={true}>{trade.description}</Typography>
          <div className="trade-card-tags">
            {trade.tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
          <div className="trade-card-tags">Seeking:
            {trade.tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
        </div>
        {trade.type === "Offering" ? <Button startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button> : <Button startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button>}
        <Button >View profile</Button>
      </div>
    </Paper>
  )
}))

export default SearchTradeCard