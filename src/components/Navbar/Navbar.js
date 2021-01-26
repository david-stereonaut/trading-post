import { AppBar, Avatar, IconButton, InputBase, Tab, Tabs, TextField, Toolbar } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';
import { observer, inject } from 'mobx-react'
import './Navbar.scss'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import { useState } from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import tradingPost from '../../assets/navbar.jpg'


const Navbar = inject('GeneralStore', 'UserStore', 'SearchStore', 'MessagesStore')(observer((props) =>  {

  const { GeneralStore, UserStore, SearchStore, MessagesStore } = props

  const [searchInput, setSearchInput] = useState('')

  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  let history = useHistory();

  const search = (e) => {
    if (e.key === 'Enter') {
      SearchStore.searchOffering(searchInput)
      setSearchInput('')
      history.push('/search')
    }
  }

  const signOut = () => {
    localStorage.clear()
    UserStore.signOut()
    MessagesStore.signOut()
    history.push('/search')
  }

  return (
    <AppBar position="fixed" style={{flexDirection: 'row'}}>
      <Tabs value={GeneralStore.currentTab} onChange={GeneralStore.handleTabChange}>
        <Tab style={{minWidth: 30}} icon={UserStore.user.firstName ? (<Avatar alt="User" src={UserStore.user.profilePic.imageUrl} />) : <AccountCircleIcon/>} component={Link}  to={UserStore.user._id ? `/profile/${UserStore.user._id}` : '/login'} {...tabProps(0)} />
        <Tab style={{minWidth: 30}} icon={<HomeIcon />} component={Link}  to="/search" {...tabProps(1)} />
        <Tab style={{minWidth: 30}} icon={<InboxIcon />} component={Link}  to="/messages" {...tabProps(2)} />
        <Tab style={{display: 'none'}} {...tabProps(3)} />
      </Tabs>
      {GeneralStore.currentTab !== 1 && <TextField placeholder="Search" onKeyDown={search} value={searchInput} onChange={({ target }) => setSearchInput(target.value)} variant="outlined" size="small" InputProps={{
        style: {
            backgroundColor: "white",
            height: 30
        }
        }}
      />}
      <img style={{height: 52, marginLeft: 'auto'}} src={tradingPost} alt="our logo" />
      {UserStore.user._id && <IconButton onClick={signOut}><ExitToAppIcon /></IconButton>}
    </AppBar>
  )
}))

export default Navbar