import { Card, CardMedia, Paper, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress, makeStyles, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useEffect, useState } from 'react';
import Photo from '../Photo';
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core';
import Tag from '../../Tag';

const uploadUrl = "https://api.cloudinary.com/v1_1/idoerez/image/upload"
const deleteUrl = "https://api.cloudinary.com/v1_1/idoerez/image/destroy"
const preset = 'idoerez';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  loadingScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 175,
    height: 175,
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1.5vh',
    '& > *': {
      margin: 5
    }
  }
}))


const AddTradeCard = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, GeneralStore, newTrade } = props
  const [imageUrl, setImageUrl] = useState('')
  const [imageId, setImageId] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Offering')
  const [addTagInput, setAddTagInput] = useState('')
  const [loading, setLoading] = useState(false)



  const choosePhoto = async e => {
    if (!GeneralStore.editTradeImageUrl && e.target.files[0]) {
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
      GeneralStore.handleEditTrade('editTradeImageUrl', res.data.secure_url)
      GeneralStore.handleEditTrade('editTradeImageId', res.data.public_id)
    } else if (e.target.files[0]){
      console.log('delete happens')
      const newFormData = new FormData();
      newFormData.append('file', e.target.files[0]);
      newFormData.append('upload_preset', preset);
      const deleteId = GeneralStore.editTradeimageId
      setLoading(true)
      const res = await axios.post(uploadUrl, newFormData);
      setLoading(false)
      GeneralStore.handleEditTrade('editTradeImageUrl', res.data.secure_url)
      GeneralStore.handleEditTrade('editTradeImageId', res.data.public_id)
      let result = await axios.post('http://localhost:3001/destroyImage', {id: deleteId})
      console.log(result.data)
    }
  }
  
  const emptyValues = () => {
    GeneralStore.handleEditTrade('editTradeImageUrl', '')
    GeneralStore.handleEditTrade('editTradeImageId', '')
    GeneralStore.handleEditTrade('editTradeTitle', '')
    GeneralStore.handleEditTrade('editTradeSubTitle', '')
    GeneralStore.handleEditTrade('editTradeDescription', '')
    GeneralStore.handleEditTrade('editTradeType', 'Offering')
    GeneralStore.handleEditTrade('editTradeId', '')
    GeneralStore.handleEditTrade('editTradeTags', [])
  }

  const cancel = async () => {
    if(GeneralStore.editTradeImageUrl && !GeneralStore.editTradeId){
      let result = await axios.post('http://localhost:3001/destroyImage', {id: GeneralStore.editTradeimageId})
      console.log(result.data)
    }
    emptyValues()
    GeneralStore.handleAddTradeCardDialog()
  }


  const save = async () => {
    if(!GeneralStore.editTradeId) {
      UserStore.addTradeCard({
        user_id: UserStore.user._id,
        type: GeneralStore.editTradeType,
        title: GeneralStore.editTradeTitle,
        subTitle: GeneralStore.editTradeSubTitle,
        description: GeneralStore.editTradeDescription,
        tags: [...GeneralStore.editTradeTags],
        thumbnail: {
          imageUrl: GeneralStore.editTradeImageUrl,
          imageId: GeneralStore.editTradeImageId
        }
      })
      emptyValues()
      GeneralStore.handleAddTradeCardDialog()
    } else {
      UserStore.editTradeCard({
        user_id: UserStore.user._id,
        type: GeneralStore.editTradeType,
        title: GeneralStore.editTradeTitle,
        subTitle: GeneralStore.editTradeSubTitle,
        description: GeneralStore.editTradeDescription,
        tags: [...GeneralStore.editTradeTags],
        thumbnail: {
          imageUrl: GeneralStore.editTradeImageUrl,
          imageId: GeneralStore.editTradeImageId
        }
      }, GeneralStore.editTradeId)
      emptyValues()
      GeneralStore.handleAddTradeCardDialog()
    }
  }

  const addTag = () => {
    const newTag = addTagInput.charAt(0).toUpperCase() + addTagInput.slice(1)
    setAddTagInput('')
    GeneralStore.addEditTag(newTag)
  }

  const deleteTrade = () => {
    UserStore.deleteTradeCard(GeneralStore.editTradeId)
    emptyValues()
    GeneralStore.handleAddTradeCardDialog()
  }

  const classes = useStyles()
  return (
    <Dialog maxWidth={false} open={GeneralStore.AddTradeCardDialog} aria-labelledby="form-dialog-title">
      <div className={classes.mainContainer}>
        <div className={classes.imageSection}>
            {!loading ?
            GeneralStore.editTradeImageUrl ? <Photo imgUrl={GeneralStore.editTradeImageUrl} /> : 
            <Card className={classes.loadingScreen}>
              <Typography>No Image chosen</Typography>
            </Card> :
            <Card className={classes.loadingScreen}>
              <CircularProgress />
            </Card>
            }
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
        </div>
        <div className={classes.imageSection} >
          <TextField style={{width: '20vw'}} label='Title' value={GeneralStore.editTradeTitle} onChange={({ target }) => GeneralStore.handleEditTrade('editTradeTitle', target.value)} />
          <TextField style={{width: '20vw'}} label='Sub Title' multiline value={GeneralStore.editTradeSubTitle} onChange={({ target }) => GeneralStore.handleEditTrade('editTradeSubTitle', target.value)} />
          <TextField style={{width: '20vw'}} label='Description' multiline value={GeneralStore.editTradeDescription} onChange={({ target }) => GeneralStore.handleEditTrade('editTradeDescription', target.value)} />
          <FormControl>
            <InputLabel >Trade Type</InputLabel>
            <Select
              value={GeneralStore.editTradeType}
              onChange={(e) => GeneralStore.handleEditTrade('editTradeType', e.target.value)}
            >
              <MenuItem value={'Seeking'}>Seeking</MenuItem>
              <MenuItem value={'Offering'}>Offering</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.buttons}>
            <Button onClick={cancel}>Cancel</Button>
            <Button onClick={save}>Save</Button>
            {GeneralStore.editTradeId && <Button onClick={deleteTrade}>Delete</Button>}
          </div>
        </div>
        <div className={classes.imageSection}>
          {GeneralStore.editTradeTags.length === 0 ?
            <Typography>No tags picked</Typography> :
            <Paper style={{width: '10vw'}}>
              {GeneralStore.editTradeTags.map((tag) => {
                return <Tag editable={true} tag={tag} tradeCard={true} />
              })}
            </Paper>
          }
          <TextField label='Add Tag' value={addTagInput} onChange={({target}) => setAddTagInput(target.value)} />
          <Button onClick={addTag}>Add tag</Button>
        </div>
      </div>
    </Dialog>
  )
}))

export default AddTradeCard