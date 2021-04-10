/* eslint-disable quote-props */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NeoVis from 'NeoVis.js';
import { Container, Card } from '../styledComponents';
import { WideColumnContainer, Graph } from './StyleElements';
import AddFriend from '../AddFriend';
import { mainOrange } from '../styledComponents/globalStyles';


/**
 * Neovis graphing function for a given user ID.
 * Queries Neo4J database for a the user's contacts through the 4th degree,
 * renders a visualization of the results of this query with set config.
 *
 * @param {*} userId
 */
const drawGraph = (userId) => {
  const config = {
    container_id: 'viz',
    server_url: process.env.NEO4J_URI,
    server_user: process.env.NEO4J_USER,
    server_password: process.env.NEO4J_PASSWORD,
    labels: {
      User: {
        caption: 'name',
        community: {
          color: mainOrange,
        },
        title_properties: ['name', 'username'],
      },
    },
    relationships: {
      CONTACTED: {
        caption: false,
      },
    },
    initial_cypher: `MATCH (u:User {userId: '${userId}'})-[r1:CONTACTED*1..4]-(c:User) RETURN *`,
  };
  const viz = new NeoVis(config);
  viz.render();
};

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
  );
};

export default AllFriends;
