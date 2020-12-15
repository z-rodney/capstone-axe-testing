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

  & h4 {
    margin-bottom: 12px;
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
                {ev.contacts &&
                  (ev.contacts.length
                  ? <ul>
                    {ev.contacts.map(c => {
                      return <Link to={`/friends/${c.userId}`} key={c.userId}><li>{c.name}</li></Link>
                    })}
                    </ul>
                  : <p>None</p>
                  )}
                <h4>COVID-19 Data in this area:</h4>
                <p>{`${Math.ceil(ev.location.caseDensity) || 'Unknown'} cases per 100,000 people`}</p>
                <p>{`${ev.location.testPosRatio
                  ? (ev.location.testPosRatio * 100).toFixed(2)
                  : 'Unknown'}% test positivity rate`}
                </p>
                <small><a href="https://www.covidactnow.org/?s=1438402">Want more info?</a></small>
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
