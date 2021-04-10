import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { ColumnContainer, RowContainer, Card, SidebarRight } from '../styledComponents/index'
import FriendList from '../FriendsList'
import RiskProfile from '../RiskProfile'
import TestResults from '../TestResults'
import { getFriendProfile } from '../../redux/friendProfile'
import Calendar from '../Calendar';

const ProfileLink = styled(Link)`
  padding: 8px;
  margin-bottom: 4px;
`

/**
 * Parent component for a friend's profile. Calls sub-components with forFriend
 * prop to indicate that all data on this page should be for a friend, not the user
 * themself.
 *
 * @param {*} props
 * @return {*}
 */
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
            <div>
              <h2>Events</h2>
              <Card>
                  <Calendar forFriend={true} />
              </Card>
            </div>
          </ColumnContainer>
          <SidebarRight flex="0 1 35%">
            <div>
              <TestResults forFriend={true} />
            </div>
            <div>
              <RiskProfile forFriend={true} />
            </div>
            <div>
              <FriendList forFriend={true} />
            </div>
          </SidebarRight>
        </RowContainer>
      </ColumnContainer>
  )
}

export default FriendProfile;
