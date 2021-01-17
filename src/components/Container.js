import { Route, Redirect } from "react-router-dom";
import Profile from "./Profile/Profile";
import Search from "./Search/Search";
import Messages from "./Messages/Messages";


export default function Container() {

  return (
    <div id="container">
      <Route exact path="/">
        <Redirect to="/search" />
      </Route> 
      <Route exact path="/search" render={() => <Search />}/>
      <Route exact path="/profile" render={() => <Profile />}/>
      <Route exact path="/messages" render={() => <Messages />}/>
    </div>
  )
}