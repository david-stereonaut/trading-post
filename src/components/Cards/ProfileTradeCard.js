import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Tag from '../Tag'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'
import barterIcon from '../../assets/noun_Work for Food_97466.svg'

const styles = makeStyles({
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  }
})
function TradeIcon(props) {
  const classes = styles()
  return (
    <Icon fontSize="large" classes={{root: classes.iconRoot}}>
      <img className={classes.imageIcon} src={barterIcon} alt="barter"/>
    </Icon>
  );
}

const ProfileTradeCard = inject('SearchStore')(observer((props) =>  {

  const { SearchStore, trade } = props

  return (
    <Paper>
      <div className="profile-trade-card">
        <Card style={{width:125}}>
          <CardMedia style={{height: 125}}
            image={trade.thumbnail}
            title="Trade Thumbnail"
          />
        </Card>
        <div class="middle-section">
          <Typography variant="body1">{trade.title}</Typography>
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">{trade.subTitle}</Typography>
          <Typography variant="body1" style={{fontSize: 14}}  paragraph={true}>{trade.description}</Typography>
          <div class="trade-card-tags">
            {trade.tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
        </div>
        {trade.type === "Offering" ? <Button startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button> : <Button startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button>}
      </div>
    </Paper>
  )
}))

export default ProfileTradeCard