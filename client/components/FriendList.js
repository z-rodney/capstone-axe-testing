import React from 'react'
import { Link } from 'react-router-dom'
import { FriendCard, RowContainer } from './styledComponents'

const friends = [
  {name: 'Ann'},
  {name: 'David'},
  {name: 'Susie'}
]

const FriendList = ({friendsList = friends}) => {
  return (
      <FriendCard>
        <Link to="/friends">View All Friends</Link>
        {friendsList.map(friend => {
          return (
            <RowContainer>
              <img className="profile-pic" src="https://cdn.onlinewebfonts.com/svg/img_415067.png"/>
              <p className="spaced">{friend.name}</p>
            </RowContainer>
          )})
        }
    </FriendCard>
  )
}

export default FriendList
