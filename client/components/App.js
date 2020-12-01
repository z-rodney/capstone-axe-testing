import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
// import SignIn from './SignIn';
// import SignUp from './SignUp';
import AccountSettings from './Account'
import AllFriends from './AllFriends'
import FriendProfile from './FriendProfile'
import UserProfile from './UserProfile'
import RiskForm from './RiskForm'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <Router>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route path="/signIn" component={SignIn} exact />
        <Route path="/signUp" component={SignUp} exact /> */}

        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/friends" component={AllFriends} />
        <Route exact path="/friends/:friendId" component={FriendProfile} />
        <Route exact path="/account" component={AccountSettings} />
        <Route exact path="/my-risk" component={RiskForm} />
      </Switch>
      <Footer />
    </Router>
  );
}


  export default App;
