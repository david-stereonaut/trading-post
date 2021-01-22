import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'
import barterIcon from '../assets/noun_Work for Food_97466.svg'

const useStyles = makeStyles({
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  }
})

export function TradeIcon(props) {
  const classes = useStyles()
  return (
    <Icon fontSize="large" classes={{root: classes.iconRoot}}>
      <img className={classes.imageIcon} src={barterIcon} alt="barter"/>
    </Icon>
  );
}