import React from 'react'
import { RowContainer, ColumnContainer, Card, Sidebar } from './styledComponents'
import RiskProfile from './RiskProfile'
import FriendList from './FriendList'


const UserProfile = () => {
  return (
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
           <Card>
            <p>Map to go here</p>
           </Card>
        </div>
        <div>
          <h2>My Events</h2>
           <Card>
            <p>Calendar to go here</p>
           </Card>
        </div>
      </ColumnContainer>
    </RowContainer>
  )
}

export default UserProfile
