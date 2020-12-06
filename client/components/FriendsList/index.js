import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RowContainer } from '../styledComponents'
import { FriendCard } from './StyleElements'
import axios from 'axios'


const FriendList = ({friendsList = friends, all}) => {
  const [friends, setFriends] = useState([])


useEffect(() => {
  const getFriends = async() => {
  const p = await axios.get('/api/user/063b50cc-4dd1-411b-b4fd-de80a4f9328d/getFriends/')
  setFriends(p.data)
}
getFriends()

}, [])
  return (
      <FriendCard>
      <Link to="/friends">View All Friends</Link>
        {friends.map(friend => {
          return (
            <RowContainer>
              <img className={ all ? 'all-friends' : 'profile-pic'} src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
              <Link to="/friends/1"><p className="spaced">{friend.name}</p></Link>
            </RowContainer>
          )})
        }
      </FriendCard>
  )
}

export default FriendList
