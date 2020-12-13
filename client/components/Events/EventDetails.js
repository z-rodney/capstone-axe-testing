import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getLocations } from '../../redux/userLocations';
import styled from 'styled-components';
import { mainOrange } from '../styledComponents/globalStyles';

const DetailCard = styled.div`
  background: #F7F7F7;
  border-radius: 9px;
  box-sizing: border-box;
  padding: 7px;
  margin: 0 5px;

  & p:not(:first-child) {
    margin-bottom: 0;
    margin-top: 5px;
  }
`

const Title = styled.p`
  color: ${mainOrange};
  margin-bottom: 0;
  text-align: center;
  font-weight: 500;
`

function EventDetails({ dateSelected }) {
  const locations = useSelector(state => state.locations);
  const userId = useSelector(state => state.loginStatus.userId);
  const dispatch = useDispatch();

  dateSelected = new Date(dateSelected);
  dateSelected = moment(dateSelected).format('YYYY-MM-DD');
  const daysLocations = locations.filter(loc => loc.dateVisited === dateSelected);

  useEffect(() => {
    if (userId) {
      dispatch(getLocations(userId));
    }
  }, [userId])

  return (
    <div>
      <h3>Events</h3>
      { daysLocations.length > 0 ?
      <div>
        <ul>
          {daysLocations.map((ev) => {
            return (
              <DetailCard key={ ev.location.title }>
                <Title>{ ev.location.title }</Title>
                <h4>Location:</h4>
                <p>{ ev.location.placeName }</p>
                <h4>Contacts:</h4>
                <ul>{ ev.contacts && ev.contacts.map(c => {
                  return <Link to={`/friends/${ c.userId }`} key={ c.userId }><li>{ c.name }</li></Link>
                }) }
                </ul>
              </DetailCard>
            )
          })}
        </ul>
      </div>
      : <div>No Events Found</div>
      }
    </div>
  )
}

export default EventDetails;
