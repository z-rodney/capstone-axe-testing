import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { DetailCard, Title } from './StyleElements';
import { getLocations } from '../../redux/userLocations';

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
      : <div>No Events Found</div> }
    </div>
  )
}

export default EventDetails;
