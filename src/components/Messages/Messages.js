import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
// import './Messages.scss'
import ListContainer from './ListContainer'
import MessagesContainer from './MessagesContainer'
import ReviewPopup from './ReviewPopup';
import GeneralPopup from './GeneralPopup';
import TextPopup from './TextPopup';
import { Divider, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    height: '81vh',
  },
}))

const Messages = inject('MessagesStore', 'UserStore', 'GeneralStore')(observer((props) =>  {

  const { MessagesStore, GeneralStore } = props;
  const { UserStore } = props;

  useEffect(() => {
    GeneralStore.handleTabChange('', 2)
    if (UserStore.user._id) {
      MessagesStore.setUserId(UserStore.user._id)
    }
    MessagesStore.getCons(MessagesStore.category);
    MessagesStore.socketPort = 'http://localhost:4000';

  }, []);

  const classes = useStyles()

  return (
    <>
    <div id="messages-container">
      <Paper>
        <div className={classes.container}>
        <ListContainer/>
        <Divider orientation="vertical" flexItem />
        <MessagesContainer/>
        </div>
      </Paper>
    </div>
      <ReviewPopup/>
      <GeneralPopup/>
      <TextPopup/>
    </>
  )
}))

export default Messages