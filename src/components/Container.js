import { Route, Redirect } from "react-router-dom";
import Profile from "./Profile/Profile";
import Search from "./Search/Search";
import Messages from "./Messages/Messages";
import { inject, observer } from "mobx-react";
import Login from './Login/Login'
import Register from "./Login/Register";


const Container = inject('UserStore')(observer((props) => {

  const { UserStore } = props

  return (
    <div id="container">
      <Route exact path="/">
        <Redirect to="/search" />
      </Route>
      <Route exact path="/login" render={() => <Login />}/>
      <Route exact path="/register" render={() => <Register />}/>
      <Route exact path="/search" render={() => <Search />}/>
      <Route exact path="/profile/:userId" render={() => <Profile />}/>
      <Route exact path="/messages" render={() => <Messages />}/>
    </div>
  )
}))


export default Container