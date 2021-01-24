import { AppBar, Avatar, InputBase, Tab, Tabs, TextField, Toolbar } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';
import { observer, inject } from 'mobx-react'
import './Navbar.scss'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import { useState } from "react";


const Navbar = inject('GeneralStore', 'UserStore', 'SearchStore')(observer((props) =>  {

  const { GeneralStore, UserStore, SearchStore } = props

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
      SearchStore.searchTrades(searchInput)
      setSearchInput('')
      history.push('/search')
    }
  }

  return (
    <AppBar position="fixed" style={{flexDirection: 'row'}}>
      <Tabs value={GeneralStore.currentTab} onChange={GeneralStore.handleTabChange}>
          <Tab style={{minWidth: 30}} icon={UserStore.user.firstName ? (<Avatar alt="User" src={UserStore.user.profilePic.imageUrl} />) : <AccountCircleIcon/>} component={Link}  to={`/profile/${UserStore.user._id}`} {...tabProps(0)} />
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
    </AppBar>
  )
}))

export default Navbar