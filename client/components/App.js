import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
// import SignUp from './SignUp';
// import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
// import SignIn from './SignIn';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <Router>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      {/* <Navbar toggle={toggle} />; */}
      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route path="/signIn" component={SignIn} exact />
        <Route path="/signUp" component={SignUp} exact /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

