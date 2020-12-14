import React from 'react'
import { useSelector } from 'react-redux'
import { RowContainer, ColumnContainer, Sidebar } from '../styledComponents'
import RiskProfile from '../RiskProfile'
import FriendList from '../FriendsList'
import Locations from '../Locations'
import Events from '../Events'
import TestResults from '../TestResults'
import { getFriendProfile } from '../../redux/friendProfile'


const UserProfile = () => {
  const name = useSelector(state => state.loginStatus.name)
  
  return (
    <div>
      <div className="page-heading">
        <h1>My Profile</h1>
        <p>Welcome, { name ? name : 'User'}!</p>
      </div>
      <RowContainer>
        <Sidebar>
          <RiskProfile />
          <TestResults />
          <div>
            <h2>Friends</h2>
            <FriendList />
          </div>
        </Sidebar>
        <ColumnContainer>
          <div>
            <h2>My Locations</h2>
            <Locations />
          </div>
          <div>
            <h2>My Events</h2>
            <Events />
          </div>
        </ColumnContainer>
      </RowContainer>
    </div>
  )
}

export default UserProfile
