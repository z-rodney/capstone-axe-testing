import React from 'react';
//at some point will be able to remove card from imports
import {
  ColumnContainer,
  RowContainer,
  Card,
  SidebarRight,
} from '../styledComponents/index';
import { ResultsCard } from './StyleElements';
import FriendList from '../FriendsList';
import RiskProfile from '../RiskProfile';
import Calendar from '../Calendar';

const friend = {
  name: 'Stanley',
  location: 'Brooklyn, NY',
};

const FriendProfile = () => {
  return (
    <ColumnContainer>
      <RowContainer>
        <img
          className="profile-pic-big"
          src="https://cdn.onlinewebfonts.com/svg/img_415067.png"
        />
        <div className="profile-heading spaced">
          <h3>{friend.name}</h3>
          <p>{friend.location}</p>
        </div>
      </RowContainer>
      <RowContainer>
        <ColumnContainer>
          {/* TO-DO: get react calendar component and insert here */}
          <div>
            <h2>November 2020</h2>
            <Card>
              <p>Calendar to go here</p>
              <Calendar />
            </Card>
          </div>
          <div>
            <RiskProfile />
          </div>
        </ColumnContainer>
        <SidebarRight flex="0 1 35%">
          <div>
            <ResultsCard>
              <h2>Test Results</h2>
              <p>Negative: 10.20.20</p>
            </ResultsCard>
          </div>
          <div>
            <h2>Following</h2>
            <FriendList />
          </div>
        </SidebarRight>
      </RowContainer>
    </ColumnContainer>
  );
};

export default FriendProfile;
