import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RowContainer, Card } from '../styledComponents'
import { getFriends } from '../../redux/friends';
import { secondaryLightPurple } from '../styledComponents/globalStyles'

const FriendCard = styled(Card)`
  background: ${secondaryLightPurple};
  box-shadow: 4px 4px 6px rbga(0,0,0,.25);
`

const FriendList = () => {
  const userId = useSelector(state => state.loginStatus.userId)
  const userFriends = useSelector(state => state.friends)
  const dispatch = useDispatch()

useEffect(() => {
  if (userId) {
    dispatch(getFriends(userId))
  }
}, [userId])

  return (
    <FriendCard>
    <Link to="/friends">Add Friends</Link>
      {userFriends.map(friend => {
        return (
          <RowContainer key = {friend.userId}>
            <img className="profile-pic" src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
            <Link to= {`/friends/${friend.userId}`}><p className="spaced">{friend.name}</p></Link>
          </RowContainer>
        )})
      }
    </FriendCard>
  )
}

export default FriendList
