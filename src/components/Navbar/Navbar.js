import { AppBar, Tab, Tabs, TextField, Toolbar } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react'
import './Navbar.scss'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/Inbox';


const Navbar = inject('GeneralStore')(observer((props) =>  {

  const { GeneralStore } = props

  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  return (
    <AppBar position="fixed">
      <Tabs value={GeneralStore.currentTab} onChange={GeneralStore.handleTabChange}>
          <Tab style={{minWidth: 30}} icon={<HomeIcon />} component={Link}  to="/search" {...tabProps(0)} />
          <Tab style={{minWidth: 30}} icon={<AccountCircleIcon />} component={Link}  to="/profile" {...tabProps(1)} />
          <Tab style={{minWidth: 30}} icon={<InboxIcon />} component={Link}  to="/messages" {...tabProps(2)} />
          <TextField placeholder="Search" value='' variant="outlined" size="small" style={{marginTop: 7, marginLeft: '50px'}} InputProps={{
              style: {
                  backgroundColor: "white",
                  height: 30
              }
            }}
          />
        </Tabs>
    </AppBar>
  )
}))

export default Navbar