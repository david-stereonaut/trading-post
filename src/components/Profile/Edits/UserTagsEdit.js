import { Card, CardMedia, Paper, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress, makeStyles } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useState } from 'react';
import Tag from '../../Tag';

const useStyles = makeStyles(theme => ({
  tagEdit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *':{
      marginBottom: 5,
      marginTop: 5
    }
  }
}))


const UserTagsEdit = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, GeneralStore, type } = props

  const [tagInput, setTagInput] = useState('')

  const close = () => {
    type === 'seeking' ? GeneralStore.handleUserSeekTagEdit() : GeneralStore.handleUserOfferTagEdit()
  }

  const classes = useStyles()
  return (
    <div className={classes.tagEdit}>
      <Paper>
        {UserStore.user[type+'Tags'].map(tag => <Tag key={tag} tag={tag} editable={true} type={type} />)}
      </Paper>
      <TextField value={tagInput} onChange={(e) => setTagInput(e.target.value)} label="Tag name" />
      <div><Button color="primary" variant="contained" size="small" onClick={() => UserStore.addTag(tagInput, type)}>Add</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button color="primary" variant="contained" size="small" onClick={close}>Done</Button></div>
    </div>
  )
}))

export default UserTagsEdit