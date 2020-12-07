import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RowContainer } from '../styledComponents'
import { FriendCard } from './StyleElements'
import axios from 'axios'


const FriendList = ({all}) => {
  const userId = useSelector(state => state.loginStatus.userId)
  const [friends, setFriends] = useState([])


useEffect(() => {
  const getFriends = async() => {
  const p = await axios.get(`/api/user/${userId}/getFriends/`)
  setFriends(p.data)
}
getFriends()
}, [])
console.log(friends)
  return (
      <FriendCard>
      <Link to="/friends">View All Friends</Link>
        {friends.map(friend => {
          return (
            <RowContainer key = {friend.userId}>
              <img className={ all ? 'all-friends' : 'profile-pic'} src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
              <Link to= {`/friends/${friend.userId}`}><p className="spaced">{friend.name}</p></Link>
            </RowContainer>
          )})
        }
      </FriendCard>
  )
}

export default FriendList
