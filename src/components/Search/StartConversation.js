import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import { useState } from 'react';
import moment from 'moment'

const StartConversation = inject('MessagesStore', 'GeneralStore', 'UserStore')(observer((props) =>  {

    const { MessagesStore, GeneralStore, UserStore } = props;

    const [addTrade, setAddTrade] = useState(false)

    const closePopup = () => GeneralStore.setStartTradeDialog(false);

    const startConversation = () => {
      const newConvo = {
        users: [UserStore.userId, GeneralStore.startTradeUserId],
        status: 'Pending',
        messages: [{
          senderId: UserStore.userId,
          message_time: moment(),
          body: GeneralStore.startTradeBody || `Hello! ${UserStore.user.firstName} wants to start a trade with you`,
          tradeCard: addTrade ? GeneralStore.startTrade : null
        }]
      }
      MessagesStore.startConversation(newConvo)
      GeneralStore.setStartTradeDialog(false)
    }

    return (
        <Dialog open = {GeneralStore.startTradeDialog}>
          <DialogTitle>Start a trade!</DialogTitle>
            <DialogContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {GeneralStore.startTrade && <FormControlLabel
                  control={<Checkbox checked={addTrade} onChange={({ target }) => setAddTrade(target.checked)} name="exactMatch" />}
                  label="Add the trade card to your message?"
                />}
                <TextField multiline variant='outlined' value={GeneralStore.startTradeBody} onChange={({ target }) => GeneralStore.setStartTradeBody(target.value)} rows={4} style={{width: 300}} label='Write your message here' />
                <Typography style={{width: 300, fontSize: 14}} variant='subtitle2' color='textSecondary'>*If you will not write a message we will generate one for you</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick = {closePopup}>Cancel</Button>
                <Button color='primary' onClick={startConversation} >Continue</Button>
            </DialogActions>
        </Dialog>
    )
}))

export default StartConversation