import { AppBar, Avatar, InputBase, Tab, Tabs, TextField, Toolbar } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react'
import './Navbar.scss'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import { useEffect } from "react";


const Navbar = inject('GeneralStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, UserStore } = props

  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  return (
    <AppBar position="fixed" style={{flexDirection: 'row'}}>
      <Tabs value={GeneralStore.currentTab} onChange={GeneralStore.handleTabChange}>
          <Tab style={{minWidth: 30}} icon={UserStore.user.firstName ? (<Avatar alt="User" src={UserStore.user.profilePic} />) : <AccountCircleIcon/>} component={Link}  to={`/profile/${UserStore.user.id}`} {...tabProps(0)} />
          <Tab style={{minWidth: 30}} icon={<HomeIcon />} component={Link}  to="/search" {...tabProps(1)} />
          <Tab style={{minWidth: 30}} icon={<InboxIcon />} component={Link}  to="/messages" {...tabProps(2)} />
        </Tabs>
          <TextField placeholder="Search" value='' variant="outlined" size="small" style={{}} InputProps={{
              style: {
                  backgroundColor: "white",
                  height: 30
              }
            }}
          />
    </AppBar>
  )
}))

export default Navbar