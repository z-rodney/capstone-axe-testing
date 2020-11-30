import React from 'react'
import { Link } from 'react-router-dom'
import { RowContainer } from '../styledComponents'
import { FriendCard } from './StyleElements'

const friends = [
  {name: 'Ann'},
  {name: 'David'},
  {name: 'Susie'}
]

const FriendList = ({friendsList = friends, all}) => {
  return (
      <FriendCard>
      <Link to="/friends">View All Friends</Link>
        {friendsList.map(friend => {
          return (
            <RowContainer>
              <img className={ all ? "all-friends" : "profile-pic"} src="https://cdn.onlinewebfonts.com/svg/img_415067.png"/>
              <Link to="/friends/1"><p className="spaced">{friend.name}</p></Link>
            </RowContainer>
          )})
        }
    </FriendCard>
  )
}

export default FriendList
