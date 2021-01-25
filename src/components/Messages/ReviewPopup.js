import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { useState } from 'react';

const ReviewPopup = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId);
  const partnerFirstName = MessagesStore.currentConId && MessagesStore.userCons[0] ? conversation.users.find(u => u._id !== MessagesStore.userId).firstName : 'your partner';

  const [stars, setStars] = useState([true, true, true, false, false])
  const [rating, setRating] = useState(3)

  const reviewAndComplete = () => MessagesStore.updateAndClosePopup('Completed', 'reviewPopup');

  const closePopup = () => MessagesStore.closePopup('reviewPopup')

  const rate = (num) => {
    setRating(num)
    switch (num) {
      case 1:
        setStars([true, false, false, false, false])
        break;
      case 2:
        setStars([true, true, false, false, false])
        break;
      case 3:
        setStars([true, true, true, false, false])
        break;
      case 4:
        setStars([true, true, true, true, false])
        break;
      case 5:
        setStars([true, true, true, true, true])
        break;
      default:
        break;
    }

  }

  const starsStyle = {
    display: 'flex'
  }

  return (
    <Dialog open = {MessagesStore.reviewPopup}>
        <DialogTitle id = "review-Popup-title">Barter completed!</DialogTitle>
        <DialogContent>
          <Typography paragraph={true}>Add a review about {partnerFirstName}</Typography>
        <TextField multiline rows={4} placeholder='Write your review here' variant="outlined" />
        <Typography variant='h6' style={{marginTop: 10}}>Rate</Typography>
        <div style={starsStyle}>
          {stars.map((star, ind) => star ? <StarIcon key={ind} style={{color: '#F7CB15', cursor: 'pointer'}} onClick={() => rate(ind+1)} /> : <StarBorderIcon key={ind} onClick={() => rate(ind+1)} style={{cursor: 'pointer'}} />)}
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick = {closePopup}>Cancel</Button>
          <Button color='primary' className = "pop-up-Button agree-Button" onClick = {reviewAndComplete}>Send Review</Button>
        </DialogActions>
    </Dialog>
  )
}))

export default ReviewPopup;