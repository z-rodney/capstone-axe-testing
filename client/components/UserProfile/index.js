import React from 'react'
import { RowContainer, ColumnContainer, Sidebar } from '../styledComponents'
import RiskProfile from '../RiskProfile'
import FriendList from '../FriendsList'
import Locations from '../Locations'
import Events from '../Events'


const UserProfile = () => {
  return (
    <div>
      <h1 className="page-heading">My Profile</h1>
      <RowContainer>
        <Sidebar>
          <RiskProfile />
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
