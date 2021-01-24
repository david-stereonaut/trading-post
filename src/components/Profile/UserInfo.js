import { Card, CardMedia, Paper, Typography, Divider, IconButton, makeStyles, TextField, Button, ClickAwayListener } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import Tag from '../Tag';
import { useParams } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { useRef, useState, useEffect } from 'react';
import UserTagsEdit from './Edits/UserTagsEdit';

const useStyles = makeStyles((theme) => ({
  userName: {
    '& button': {
      display: 'none'
    },
    '&:hover': {
      '& button': {
        display: 'inline-block'
      },
      textDecoration: (({editable}) => editable ? 'underline' : null)
    },
    display: 'flex',
    flexDirection: 'row',
    alignSelf:  ({editable}) => (editable ? `flex-start` : 'center'),
    marginLeft: ({usernameWidth,editable}) => (editable ? `calc(50% - ${usernameWidth/2}px)` : null),
  },
  columnItems: {
    display: 'flex',
    flexDirection: 'column'
  },
  profilePic: {
    '& button': {
      display: 'none',
      position: 'relative',
      float: 'right'
    },
    '&:hover': {
      '& button': {
        display: 'inline-block'
      },
    },
    width: 175,
    marginTop: '1vh'
  },
  tags: {
    '& button': {
      display: 'none'
    },
    '&:hover': {
      '& button': {
        display: 'inline-block'
      }
    },
    display: 'flex',
    flexDirection: 'row',
  }
}), { name: 'Profile' })


const UserInfo = inject('UserStore', 'GeneralStore')(observer((props) => {

  
  const userName = useRef(null)
  
  let usernameWidth = userName.current ? userName.current.offsetWidth : 87.5
  
  
  const { UserStore, GeneralStore, user, editable } = props
  
  const { userId } = useParams()
  
  
  const classes = useStyles({ usernameWidth, editable })
  
  const [editNameInput, setEditNameInput] = useState(`${UserStore.user.firstName} ${UserStore.user.lastName}`)
  const [editDescriptionInput, setEditDescriptionInput] = useState(`${UserStore.user.description}`)

  const setNewDetails = () => {
    GeneralStore.setEditName(false)
    let name = editNameInput.split(' ')
    let firstName = name[0]
    let lastName = name.length === 1 ? '' : name.length === 2 ? name[1] : name.splice(1).toString().replace(',', ' ')
    UserStore.updateUserName(firstName, lastName, editDescriptionInput)
  }

  return (
    <div>
      <Paper style={{}}>
        <div id="user-info">
          <Card className={classes.profilePic}>
            {editable && <IconButton size="small" onClick={GeneralStore.openProfilePicDialog}><EditIcon /></IconButton>}
            <CardMedia style={{ height: 175 }}
              image={user.profilePic ? user.profilePic.imageUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
              title="User"
            />
          </Card>
          <ClickAwayListener onClickAway={() => GeneralStore.setEditName(false)}>
          {
          !GeneralStore.editName ?
          <div>
            <div className={classes.userName}>
              <Typography variant="h5" ref={userName}>
                {`${user.firstName} ${user.lastName}`}
              </Typography>
                {editable && <IconButton size="small" onClick={() => GeneralStore.setEditName(true)}><EditIcon /></IconButton>}
            </div> 
            <div>
              <Typography variant="body2" color="textSecondary">{user.description}</Typography>
            </div>
          </div> :
          <div className={classes.columnItems}>
            <TextField
              label="Name"
              onChange={(event) => setEditNameInput(event.target.value)}
              value={editNameInput}
            />
            <TextField
              multiline
              label="Description"
              onChange={(event) => setEditDescriptionInput(event.target.value)}
              value={editDescriptionInput}
            />
            <Button onClick={setNewDetails}>Save</Button>
          </div>
          }
          </ClickAwayListener>
          <div style={{ marginTop: 10 }}>
            <div className={classes.tags}>
              <Typography variant="body1" style={{ alignSelf: 'flex-start' }}>Offering</Typography>
              {editable && <IconButton size="small" onClick={GeneralStore.handleUserOfferTagEdit}><EditIcon fontSize="inherit" /></IconButton>}
            </div>
            {!GeneralStore.UserOfferTagEdit ?
            <div className="user-tag-container">
              {user.offeringTags && user.offeringTags.length > 0 ? user.offeringTags.map(tag => <Tag key={tag} tag={tag} />) : <Typography variant="subtitle1" >User has no offering tags</Typography>}
            </div> :
            <UserTagsEdit type={'offering'} />}
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <div className={classes.tags}>
              <Typography variant="body1" style={{ alignSelf: 'flex-start' }}>Seeking</Typography>
              {editable && <IconButton size="small" onClick={GeneralStore.handleUserSeekTagEdit}><EditIcon fontSize="inherit" /></IconButton>}
            </div>
            {!GeneralStore.UserSeekTagEdit ?
            <div className="user-tag-container">
              {user.seekingTags && user.seekingTags.length > 0 ? user.seekingTags.map(tag => <Tag key={tag} tag={tag} />) : <Typography variant="subtitle1" >User has no seeking tags</Typography>}
            </div> :
            <UserTagsEdit type={'seeking'} />}
          </div>
        </div>
      </Paper>
    </div>
  )
}))

export default UserInfo