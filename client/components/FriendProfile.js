import React from 'react'
import { ColumnContainer, RowContainer, Card, SidebarRight, ResultsCard } from './styledComponents'
import FriendList from './FriendList'
import RiskProfile from './RiskProfile'

const friend = {
  name: 'Stanley',
  location: 'Brooklyn, NY'
}

const FriendProfile = () => {
  return (
    <ColumnContainer>
      <RowContainer>
        <img className="profile-pic-big" src="https://cdn.onlinewebfonts.com/svg/img_415067.png"/>
        <div className="profile-heading spaced">
          <h3>{friend.name}</h3>
          <p>{friend.location}</p>
        </div>
      </RowContainer>
      <RowContainer>
        <ColumnContainer>
          <div>
          <h2>November 2020</h2>
           <Card>
            <p>Calendar to go here</p>
           </Card>
          </div>
          <div>
            <RiskProfile />
          </div>
        </ColumnContainer>
        <SidebarRight flex="0 1 35%">
          <div>
            <h2>{`${friend.name}'s Pod`}</h2>
            <FriendList />
          </div>
          <div>
            <ResultsCard>
              <h2>Test Results</h2>
              <p>Negative: 10.20.20</p>
            </ResultsCard>
          </div>
        </SidebarRight>
      </RowContainer>
    </ColumnContainer>
  )
}

export default FriendProfile
