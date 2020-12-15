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
  margin-top: 28px;
`

const FriendList = ({forFriend}) => {
  const userId = useSelector(state => state.loginStatus.userId)
  const friendId = useSelector(state => state.singleFriend.userId)
  const userFriends = useSelector(state => state.friends)
  const friendFriends = useSelector(state => state.singleFriend.friends)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!forFriend) {
      dispatch(getFriends(userId));
    }
  }, [userId, friendId])

  const friends = (forFriend ? friendFriends : userFriends)
  return (
    <FriendCard>
      { forFriend ? <h2>Following</h2> : <h2>Friends</h2> }
      { !forFriend && <Link to="/friends">Add Friends</Link> }
      {friends.length
        ? friends.map(friend => {
          return (
            <RowContainer key = {friend.userId}>
              <img className="profile-pic" src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
              <Link to= {`/friends/${friend.userId}`}><p className="spaced">{friend.name}</p></Link>
            </RowContainer>
          )})
        : <p>No friends</p>}
    </FriendCard>
  )
}

export default FriendList
