import { Card, CardMedia, Paper, Typography, Divider, makeStyles, Button, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import Photo from './Photo'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import ImageUpload from './Edits/ImageUpload';

const useStyles = makeStyles((theme) => ({
  photosTitle: {
    '& .editIcon': {
      display: 'none'
    },
    '&:hover': {
      '& button': {
        display: 'inline-block'
      },
    },
    display: 'flex',
    flexDirection: 'row',
  },
  photo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  insideButtons: {
    alignSelf: 'center'
  },
  insideBtton: {
    margin: '1.5vh'
  },
  photosContainer: {
    boxSizing:'border-box',
    padding: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  removeButton: {
    marginTop: 10
  }
}), { name: 'Photos' })

const UserPhotos = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, user, editable, GeneralStore } = props

  const [editMode, setEditMode] = useState(false)

  const { userId } = useParams()

  const classes = useStyles()

  return (
    <Paper className={classes.photosContainer}>
      <div className={classes.photosTitle}>
        <Typography variant="h6">Photos:</Typography>
        {editable && !editMode && <IconButton className="editIcon" size="small" onClick={() => setEditMode(true)}><EditIcon /></IconButton>}
      </div>
        {editable && editMode && 
          <div className={classes.insideButtons}>
            {user.images && user.images.length < 5 && <IconButton color="primary" className={classes.insideButton} onClick={() => GeneralStore.handleImageUploadDialog()}><AddIcon /></IconButton>}
            <IconButton className={classes.insideButton} color="primary" onClick={() => setEditMode(false)}><DoneIcon /></IconButton>
          </div>}
      <div className="user-photos-container">
        {user.images && user.images.length > 0 ? user.images.slice().reverse().map((img, ind) => 
        <div className={classes.photo}>
          <Photo key={ind} imgUrl={img.imageUrl} />
          {editMode && <Button onClick={() => UserStore.removeImage(img.imageUrl, img.imageId)} className={classes.removeButton}>Remove</Button>}
        </div>) : <Typography>User has no photos</Typography>}
      </div>
    </Paper>
  )
}))

export default UserPhotos