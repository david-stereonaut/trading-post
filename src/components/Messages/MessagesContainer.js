import { makeStyles } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import ConHeader from "./ConHeader";
import MessagesText from './MessagesText';
import TypeBar from "./TypeBar";

const useStyles = makeStyles(() => ({
    messages: {
        width: 'calc(100% - 380px)',
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        height: '81vh',
    }
}))

const MessagesContainer = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props
  const conStatus = MessagesStore.currentConId && MessagesStore.userCons[0] ? MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId).status : null;

  const classes = useStyles()

    return (
        <div className={classes.messages}>
            {MessagesStore.currentConId && <ConHeader/>}
            {MessagesStore.currentConId && <MessagesText/>}
            {MessagesStore.currentConId && conStatus === 'Active' && <TypeBar/>}
        </div>
    )
}))

export default MessagesContainer;