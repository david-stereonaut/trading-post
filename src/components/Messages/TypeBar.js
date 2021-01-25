import { IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  typeBar: {
    height: 40,
    display: 'flex',
    marginTop: 'auto'
  }
}))

const TypeBar = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;

  const typeMessage = e => MessagesStore.typeMessage(e.target.value);

  const sendByClick = () => MessagesStore.sendMessage();

  const sendByEnter = e => {if (e.keyCode === 13) {MessagesStore.sendMessage()}}

  const classes = useStyles()

  return (
    <Paper className={classes.typeBar}>
        <InputBase style={{width: 'calc(100% - 40px)'}} value = {MessagesStore.newMessage} placeholder = "New message" onChange = {typeMessage} onKeyDown = {sendByEnter}/>
        <IconButton style={{height: 40, width: 40}} onClick = {sendByClick}><SendIcon /></IconButton>
    </Paper>
  )
}))

export default TypeBar;