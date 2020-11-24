import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './Navbar'
import AccountSettings from './AccountSettings'
import FriendProfile from './FriendProfile'
import UserProfile from './UserProfile'

const App = () => {
    return (
        <Router>
            <NavBar />
            <h1>Capstone!!</h1>
                <Switch>
                    <Route exact path="/profile" component={UserProfile} />
                    <Route exact path="/friends" component={FriendProfile} />
                    <Route exact path="/account" component={ AccountSettings }/>
                </Switch>
        </Router>
    )
}

export default App
