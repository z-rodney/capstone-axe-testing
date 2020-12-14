import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
//at some point will be able to remove card from imports
import { ColumnContainer, RowContainer, Card, SidebarRight } from '../styledComponents/index'
import { Link, Redirect } from 'react-router-dom'
import FriendList from '../FriendsList'
import RiskProfile from '../RiskProfile'
import TestResults from '../TestResults'
import { getFriendProfile } from '../../redux/friendProfile'

const ProfileLink = styled(Link)`
  padding: 8px;
  margin-bottom: 4px;
`

const FriendProfile = (props) => {
  window.scrollTo(0, 0)
  const dispatch = useDispatch();
  const { friendId } = props.computedMatch.params
  const userId = useSelector(state => state.loginStatus.userId);
  const friendInfo = useSelector(state => state.singleFriend)
  const { name, username } = friendInfo

  useEffect(() => {
    dispatch(getFriendProfile(friendId))
  }, [friendId])

  return (
    (friendId === userId) ?
      <Redirect to="/profile" /> :
      <ColumnContainer>
        <ProfileLink to= "/profile">{`< Back to Profile`}</ProfileLink>
        <RowContainer>
          <img className="profile-pic-big" src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
          <div className="profile-heading spaced">
            <h3>{name}</h3>
            <p>{username}</p>
          </div>
        </RowContainer>
        <RowContainer>
          <ColumnContainer>
            {/* TO-DO: get react calendar component and insert here */}
            <div>
            <h2>November 2020</h2>
            <Card>
              <p>Calendar to go here</p>
            </Card>
            </div>
            <div>
              <RiskProfile forFriend={true} />
            </div>
          </ColumnContainer>
          <SidebarRight flex="0 1 35%">
            <div>
              <TestResults forFriend={true} />
            </div>
            <div>
              <h2>Following</h2>
              <FriendList forFriend={true} />
            </div>
          </SidebarRight>
        </RowContainer>
      </ColumnContainer>
  )
}

export default FriendProfile
