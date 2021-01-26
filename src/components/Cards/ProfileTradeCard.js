import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Tag from '../Tag'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'
import barterIcon from '../../assets/noun_Work for Food_97466.svg'
import { TradeIcon } from '../TradeIcon'
import EditIcon from '@material-ui/icons/Edit';
import AddTradeCard from '../Profile/Edits/AddTradeCard'
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


const ProfileTradeCard = inject('GeneralStore')(observer((props) =>  {

  const { GeneralStore, trade, editable } = props

  const classes = useStyles()

  const openEdit = () => {
    GeneralStore.handleEditTrade('editTradeImageUrl', trade.thumbnail.imageUrl)
    GeneralStore.handleEditTrade('editTradeImageId', trade.thumbnail.imageId)
    GeneralStore.handleEditTrade('editTradeTitle', trade.title)
    GeneralStore.handleEditTrade('editTradeSubTitle', trade.subTitle)
    GeneralStore.handleEditTrade('editTradeDescription', trade.description)
    GeneralStore.handleEditTrade('editTradeType', trade.type)
    GeneralStore.handleEditTrade('editTradeTags', trade.tags)
    GeneralStore.handleEditTrade('editTradeId', trade._id)
    GeneralStore.handleAddTradeCardDialog()
  }

  const startTrade = () => {
    GeneralStore.setStartTradeUserId(trade.user_id)
    GeneralStore.setStartTrade(trade)
    GeneralStore.setStartTradeDialog(true)
  }

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
            {editable && <IconButton size="small" onClick={openEdit} ><EditIcon className={classes.editIcon} /></IconButton>}
          </div>
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">{trade.subTitle}</Typography>
          <Typography variant="body1" style={{fontSize: 14}}  paragraph={true}>{trade.description}</Typography>
          <div className="trade-card-tags">
            {trade.tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
        </div>
        {<Button onClick={startTrade} startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button>}
      </div>
    </Paper>
  )
}))

export default ProfileTradeCard