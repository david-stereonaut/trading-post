import { Card, CardMedia, Paper, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress, makeStyles } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useState } from 'react';
import Photo from '../Photo';
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core';

const uploadUrl = "https://api.cloudinary.com/v1_1/idoerez/image/upload"
const deleteUrl = "https://api.cloudinary.com/v1_1/idoerez/image/destroy"
const preset = 'idoerez';

const useStyles = makeStyles(theme => ({
  loadingScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 175,
    height: 175,
  },
  profilePicDialog: {
    '$ .MuiDialog-paper': {display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'}
  }
}))


const ProfilePicUpload = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, GeneralStore } = props
  const [imageUrl, setImageUrl] = useState(UserStore.user.profilePic.imageUrl)
  const [imageId, setImageId] = useState(UserStore.user.profilePic.imageId)
  const [loading, setLoading] = useState(false)



  const choosePhoto = async e => {
    if (imageUrl === UserStore.user.profilePic.imageUrl && e.target.files[0]) {
      console.log('same image no delete')
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('upload_preset', preset);
      console.log(formData)
      setLoading(true)
      const res = await axios.post(uploadUrl, formData);
      setLoading(false)
      console.log(res)
      setImageUrl(res.data.secure_url)
      setImageId(res.data.public_id)
    } else if (e.target.files[0]){
      console.log('delete happens')
      const newFormData = new FormData();
      newFormData.append('file', e.target.files[0]);
      newFormData.append('upload_preset', preset);
      const deleteId = imageId
      setLoading(true)
      const res = await axios.post(uploadUrl, newFormData);
      setLoading(false)
      setImageId(res.data.public_id)
      setImageUrl(res.data.secure_url)
      let result = await axios.post('http://localhost:3001/destroyImage', {id: deleteId})
      console.log(result.data)
    }
  }

  const cancel = async () => {
    GeneralStore.closeProfilePicDialog()
    if (imageUrl !== UserStore.user.profilePic.imageUrl) {
      let result = await axios.post('http://localhost:3001/destroyImage', {id: imageId})
      console.log(result.data)
      setImageUrl(UserStore.user.profilePic.imageUrl)
      setImageId(UserStore.user.profilePic.imageId)
    }
  }

  const choose = async () => {
    GeneralStore.closeProfilePicDialog()
    UserStore.changeProfilePic(imageUrl, imageId)
    if (imageUrl !== UserStore.user.profilePic.imageUrl) {
      let deleted = await axios.post('http://localhost:3001/destroyImage', {id: imageId})
      console.log(deleted.data)
    }
    setImageUrl(UserStore.user.profilePic.imageUrl)
    setImageId(UserStore.user.profilePic.imageId)
  }

  const classes = useStyles()
  return (
    <Dialog PaperProps={{
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}} open={GeneralStore.profilePicDialog} aria-labelledby="form-dialog-title">
        <DialogTitle>Change profile picture</DialogTitle>
        <DialogContent>
          {!loading ?
          imageUrl && <Photo imgUrl={imageUrl} /> :
          <Card className={classes.loadingScreen}>
            <CircularProgress />
          </Card>
          }
        </DialogContent>
        {console.log(imageUrl + 'store')}
        {console.log(UserStore.user.profilePic.imageId + 'mobx')}
        {console.log(imageId)}
            <Button 
              variant="contained"
              component="label"
              color="primary"
            >
              Upload Photo
              <input
                type="file"
                hidden
                onChange={choosePhoto}
              />
            </Button>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={choose} color="primary">
            Choose Photo
          </Button>
        </DialogActions>
      </Dialog>
  )
}))

export default ProfilePicUpload