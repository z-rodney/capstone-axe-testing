import React, { useEffect, useState } from 'react'
//at some point will be able to remove card from imports
import { ColumnContainer, RowContainer, Card, SidebarRight } from '../styledComponents/index'
import {Link} from 'react-router-dom'
import FriendList from '../FriendsList'
import RiskProfile from '../RiskProfile'
import TestResults from '../TestResults'
import axios from 'axios'

const FriendProfile = () => {
  window.scrollTo(0, 0)
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const [friend, setFriend] = useState({})

  useEffect(() => {
    const getFriend = async() => {
      const userFriend = await axios.get(`/api/user/${id}`)
      setFriend(userFriend.data)
    }
    getFriend()
  }, id)

  return (
    <ColumnContainer>
      <RowContainer>
        <img className="profile-pic-big" src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
        <div className="profile-heading spaced">
          <h3>{friend.name}</h3>
          <p>{friend.username}</p>
          <p><button><Link to= {`/profile`}>Back to Profile</Link></button></p>
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
            <RiskProfile />
          </div>
        </ColumnContainer>
        <SidebarRight flex="0 1 35%">
          <div>
          <TestResults />
          </div>
          <div>
            <h2>Following</h2>
            <FriendList />
          </div>
        </SidebarRight>
      </RowContainer>
    </ColumnContainer>
  )
}

export default FriendProfile
