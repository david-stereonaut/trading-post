import { Route, Redirect } from "react-router-dom";
import Profile from "./profile/Profile";
import Search from "./search/Search";
import Messages from "./messages/Messages";


export default function Container() {

  return (
    <div id="container">
      <Route exact path="/">
        <Redirect to="/search" />
      </Route> 
      <Route exact path="/search" render={() => <Search />}/>
      <Route exact path="/profile/:userId" render={() => <Profile />}/>
      <Route exact path="/messages" render={() => <Messages />}/>
    </div>
  )
}