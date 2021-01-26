import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Snackbar, TextField, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import { useState } from 'react';
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close';

const StartConvoSnackbar = inject('MessagesStore', 'GeneralStore', 'UserStore')(observer((props) =>  {

    const { MessagesStore, GeneralStore, UserStore } = props;

    return (
      <Snackbar
      open={MessagesStore.startConvoSnackbar}
      autoHideDuration={4000}
      onClose={() => MessagesStore.setStartConvoSnackbar('')}
      message={MessagesStore.startConvoSnackbar}
      ContentProps={{style: {backgroundColor: MessagesStore.startConvoSnackbar === 'Message sent!' ? '#59B192' : '#ce4760'}}}
      action={
        <>
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => MessagesStore.setStartConvoSnackbar('')}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
    )
}))

export default StartConvoSnackbar