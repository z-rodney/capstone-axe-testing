import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Footer from './Footer';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AccountSettings from './Account';
import AllFriends from './AllFriends';
import AddFriend from './AddFriend';
import FriendProfile from './FriendProfile';
import UserProfile from './UserProfile';
import RiskForm from './RiskForm';
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signIn" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/friends" component={AllFriends} />
        <Route exact path="/friends/follow" component={AddFriend} />
        <Route exact path="/friends/:friendId" component={FriendProfile} />
        <Route exact path="/account" component={AccountSettings} />
        <PrivateRoute path="/profile" component={UserProfile} />
        <Route exact path="/my-risk" component={RiskForm} />
        <Route path="/" component={Home} exact />
      </Switch>
      <Footer />
    </Router>
  );
}


  export default App;
