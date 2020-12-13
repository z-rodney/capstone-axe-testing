import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RowContainer } from '../styledComponents'
import { FriendCard } from './StyleElements'
import { getFriends } from '../../redux/friends';


const FriendList = ({all}) => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const userId = useSelector(state => state.loginStatus.userId)
  const userFriends = useSelector(state => state.friends)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id === 'profile') {
      dispatch(getFriends(userId));
    }
    else {
      dispatch(getFriends(id))
    }
  }, [userId, id])

  return (
    <FriendCard>
    {id === 'profile' ? <Link to="/friends">Add Friends</Link> : null}
      {userFriends.map(friend => {
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
