import React, { useState, useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { MAPBOXPK } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addLocation } from '../../redux/userLocations'
import { LocationFormStyle, LocationFormInput, LocationButton, Button } from './StyleElements'
import { useInput } from '../../customHooks/useInput'

function LocationForm({ setShowForm }) {
  const [title, setTitle] = useInput('')
  const [date, setDate] = useInput('')
  const [placeName, setPlaceName] = useState('')
  const [coords, setCoords] = useState([])
  //container that holds geocoder
  const geocoderContainer = useRef(document.getElementById('geocoder'))
  const dispatch = useDispatch()
  const userId = useSelector(state => state.loginStatus.userId)

  //geocoder lets you search for a location using a string,
  //matches the location using MapBox API and returns the lat / lng
  const geocoder = new MapboxGeocoder({
    accessToken: MAPBOXPK,
    types: 'address,country,region,place,postcode,locality,neighborhood,district',
    proximity: {
      latitude: 40.73,
      longitude: -73.94
    }
  })

  useEffect(() => {
    geocoder.addTo(geocoderContainer.current)
    geocoder.setPlaceholder('Search for a Location')
    //cleanup
    return () => {
      const geocoderInput = document.querySelector('#geocoder')
      geocoderInput.remove()
    }
  }, [])

  //when a location is selected, save the coords
  geocoder.on('result', (ev) => {
    setPlaceName(ev.result.place_name)
    setCoords(ev.result.geometry.coordinates)
  })

  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log('submitted', coords)
    let newLocationData = {
      title,
      date,
      coordinates: coords,
      placeName
    }
    dispatch(addLocation(newLocationData, userId))
    setShowForm(false)
  }

  return (
  <LocationFormStyle id="location-form" onSubmit={handleSubmit}>
    <div id="geocoder" ref={geocoderContainer} />
      <LocationFormInput id="title" placeholder="Title" onChange={ (ev) => (setTitle(ev)) } />
      {/* { date visited will now just be the date you clicked on, should pass in as props } */}
      <LocationFormInput id="date-visited" placeholder="Date Visited" onChange={(ev) => { setDate(ev) }} />
      {/* { add contacts selection here } */}
    <LocationButton type="submit">Submit</LocationButton>
  </LocationFormStyle>
  )
}

//separated into two components to fix some render weirdness with the geocoder
//and so the map doesnt re-render whenever you hide and show the form
function AddEvent() {
  const [showForm, setShowForm] = useState(false)
  return (
    <div>
      <Button onClick={() => { setShowForm(!showForm) }}>{showForm ? 'x Cancel' : '+ Add New Location'}</Button>
      {showForm && <LocationForm setShowForm={setShowForm} />}
    </div>
  )
}

export default AddEvent
