import React from 'react'
import { ColumnContainer, ThreeQuartContainer, Card } from '../styledComponents'
import FriendList from '../FriendsList'

const AllFriends = () => {
  return (
    <ThreeQuartContainer>
      <ColumnContainer>
        <div>
          <h2>My Bubble</h2>
          <Card>
            <p>Bubble Visualization to go here</p>
          </Card>
        </div>
        <div>
        <h2>All Friends</h2>
          <FriendList all={true} />
        </div>
      </ColumnContainer>
    </ThreeQuartContainer>
  )
}

export default AllFriends
