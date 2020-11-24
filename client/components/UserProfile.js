import React from 'react'
import { Link } from 'react-router-dom'
import { FriendCard, RiskCard, RowContainer, ColumnContainer, Card, Sidebar } from './styledComponents'

//temp settings until db set up
const riskSettings = [
  {
    setting: 'Mask',
    preference: true,
  },
  {
    setting: 'Indoor Dining',
    preference: false,
  },
  {
    setting: 'Outdoor Dining',
    preference: true,
  }
]

const friends = [
  {name: 'Ann'},
  {name: 'David'},
  {name: 'Susie'}
]

const UserProfile = ({ risks = riskSettings, friendsList = friends }) => {
  return (
    <RowContainer>
      <Sidebar>
        <RiskCard>
          <h2>Risk Profile</h2>
          <ul>
            {risks.map(risk => {
              const {setting, preference} = risk
              return (
                <li className={`pref-${preference}`}>{setting}</li>
              )
            })}

          </ul>
        </RiskCard>
        <div>
          <h2>Friends</h2>
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
        </div>
      </Sidebar>
      <ColumnContainer>
        <div>
          <h2>My Locations</h2>
           <Card>
            <p>Map to go here</p>
           </Card>
        </div>
        <div>
          <h2>My Events</h2>
           <Card>
            <p>Calendar to go here</p>
           </Card>
        </div>
      </ColumnContainer>
    </RowContainer>
  )
}

export default UserProfile
