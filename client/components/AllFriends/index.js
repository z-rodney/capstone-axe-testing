/* eslint-disable quote-props */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NeoVis from 'neovis.js';
import { Container, Card } from '../styledComponents';
import { WideColumnContainer, Graph } from './StyleElements';
import AddFriend from '../AddFriend';

const drawGraph = (userId) => {
  const config = {
    container_id: 'viz',
    server_url: process.env.NEO4J_URI,
    server_user: process.env.NEO4J_USER,
    server_password: process.env.NEO4J_PASSWORD,
    labels: {
      'User': {
        'caption': 'name',
        'title_properties': [
          'name',
          'username'
        ]
      }
    },
    relationships: {
      'CONTACTED': {
        'caption': false
      }
    },
    initial_cypher: `MATCH (u:User {userId: '${userId}'})-[r1:CONTACTED]->(c1:User)-[r2:CONTACTED]->(c2:User) WHERE c2.userId <> u.userId RETURN *`
  };
  const viz = new NeoVis(config);
  viz.render();
}

const AllFriends = () => {
  const userInfo = useSelector((state) => state.loginStatus);
  const { userId } = userInfo;

  useEffect(() => {
    drawGraph(userId);
  }, []);


  return (
    <Container>
      <WideColumnContainer>
        <div>
          <h2>Add Friends</h2>
          <AddFriend />
        </div>
        <div>
          <h2>My Bubble</h2>
          <Card>
            <Graph id="viz" />
          </Card>
        </div>
      </WideColumnContainer>
    </Container>
  )
}

export default AllFriends;
