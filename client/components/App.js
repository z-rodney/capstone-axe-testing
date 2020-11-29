import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './Navbar'
import AccountSettings from './Account'
import AllFriends from './AllFriends'
import FriendProfile from './FriendProfile'
import UserProfile from './UserProfile'
import RiskForm from './RiskForm'

const App = () => {
    return (
        <Router>
            <NavBar />
                <Switch>
                    <Route exact path="/profile" component={UserProfile} />
                    <Route exact path="/friends" component={AllFriends} />
                    <Route exact path="/friends/:friendId" component={FriendProfile} />
                    <Route exact path="/account" component={ AccountSettings }/>
                    <Route exact path="/my-risk" component={ RiskForm } />
                </Switch>
        </Router>
    )
}

export default App
