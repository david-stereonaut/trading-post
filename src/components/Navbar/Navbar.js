import { AppBar, Tab, Tabs } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react'
import './NavBar.scss'


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
          <Tab label={"Clients"} component={Link}  to="/clients" {...tabProps(0)} />
          <Tab label="Actions" component={Link}  to="/actions" {...tabProps(1)} />
          <Tab label="Analytics" component={Link}  to="/analytics" {...tabProps(2)} />
        </Tabs>
    </AppBar>
  )
}))

export default Navbar