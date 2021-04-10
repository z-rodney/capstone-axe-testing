import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { addLocation } from '../../redux/userLocations';
import { LocationFormStyle, LocationFormInput, LocationButton } from './StyleElements';
import { useInput } from '../../customHooks/useInput';
import { FormButton } from '../styledComponents'


/**
 * Form component for adding a new event/location to a user's history.
 * Uses geocoder for user to search locations, collects event title, date visited,
 * and allows user to select other contacts to link to this event.
 *
 * @param {*} { setShowForm }
 * @return {*}
 */
function LocationForm({ setShowForm }) {
  const [title, setTitle] = useInput('');
  const [date, setDate] = useInput('');
  const [placeName, setPlaceName] = useState('');
  const [coords, setCoords] = useState([]);
  const [contacts, setContacts] = useState([]);

  const geocoderContainer = useRef(document.getElementById('geocoder'));
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginStatus.userId);
  const friends = useSelector(state => state.friends);

  // Geocoder lets you search for a location using a string,
  // matches the location using MapBox API and returns the lat / lng
  const geocoder = new MapboxGeocoder({
    accessToken: process.env.MAPBOXPK,
    types: 'address,country,region,place,postcode,locality,neighborhood,district',
    proximity: {
      latitude: 40.73,
      longitude: -73.94
    }
  });

  useEffect(() => {
    geocoder.addTo(geocoderContainer.current);
    geocoder.setPlaceholder('Search for a Location');
    // Cleanup
    return () => {
      const geocoderInput = document.querySelector('#geocoder');
      geocoderInput.remove();
    }
  }, [])

  // When a location is selected, save the coords
  geocoder.on('result', (ev) => {
    setPlaceName(ev.result.place_name);
    setCoords(ev.result.geometry.coordinates);
  })

  const handleChange = (ev) => {
    ev.preventDefault();
    const options = ev.target.options;
    const value = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setContacts(value);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let newLocationData = {
      title,
      date,
      coordinates: coords,
      placeName,
      contacts
    };
    dispatch(addLocation(newLocationData, userId));
    setShowForm(false);
  }

  return (
    <LocationFormStyle id="location-form" onSubmit={ handleSubmit }>
      <div id="geocoder" ref={ geocoderContainer } />
        <LocationFormInput id="title" placeholder="Title" onChange={ (ev) => setTitle(ev) } />
        <LocationFormInput id="date-visited" placeholder="Date Visited" type="date" onChange={(ev) => setDate(ev) } />
        { friends.length === 0 ?
          <Link to="/friends">Add some friends!</Link> :
          <div>
            <p>Hold down the Ctrl (windows) or Command (Mac) button to select multiple contacts:</p>
            <select id="select-contacts" multiple="multiple" onChange={ (ev) => handleChange(ev) }>
              {/* Display only the user's friends in the contacts list */}
              { friends.map(friend => {
                return (
                  <option value={ friend.userId } key={ friend.id }>{ friend.name }</option>
                )
              })}
            </select>
          </div>
        }
      <LocationButton type="submit">Submit</LocationButton>
    </LocationFormStyle>
  );
}

// Separated into two components to fix some render weirdness with the geocoder
// and so the map doesn't re-render whenever you hide and show the form
function AddEvent() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <FormButton onClick={() => setShowForm(!showForm) }>{showForm ? 'x Cancel' : '+ Add Event'}</FormButton>
      {showForm && <LocationForm setShowForm={ setShowForm } />}
    </div>
  );
}

export default AddEvent;
