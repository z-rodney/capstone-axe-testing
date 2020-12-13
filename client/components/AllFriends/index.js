import React from 'react'
import { ColumnContainer, ThreeQuartContainer, Card } from '../styledComponents'
import AddFriend from '../AddFriend'

const AllFriends = () => {
  return (
    <ThreeQuartContainer>
      <ColumnContainer>
        <div>
          <h2>Add Friends</h2>
          <AddFriend />
        </div>
        <div>
          <h2>My Bubble</h2>
          <Card>
            <img src="https://miro.medium.com/max/1400/0*KIKnUvzdIkp5zcDJ" />
          </Card>
        </div>
      </ColumnContainer>
    </ThreeQuartContainer>
  )
}

export default AllFriends
