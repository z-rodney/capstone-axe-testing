import React from 'react'
import { ColumnContainer, ThreeQuartContainer, Card } from '../styledComponents'
import AddFriend from '../AddFriend'

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
        <h2>Add Friends</h2>
          <AddFriend />
        </div>
      </ColumnContainer>
    </ThreeQuartContainer>
  )
}

export default AllFriends
