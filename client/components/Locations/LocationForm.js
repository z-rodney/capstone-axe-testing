import React, { useState, useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { MAPBOXPK } from '../../../constants'
import { useDispatch } from 'react-redux'
import { addLocation } from '../../redux/userLocations'
import { LocationFormStyle, LocationFormInput, LocationButton, Button} from './StyleElements'

function LocationForm({setShowForm}) {
  const geocoderContainer = useRef(document.getElementById('geocoder'))
  const dispatch = useDispatch()
  let newCoords = []

  const geocoder = new MapboxGeocoder({
    accessToken: MAPBOXPK,
    types: 'country,region,place,postcode,locality,neighborhood'
  })
  useEffect(() => {
    geocoder.addTo(geocoderContainer.current)
    return () => {
      const geoContainer = document.getElementById('geocoder')
      geoContainer.remove()
    }
  })

  geocoder.on('result', (ev) => {
    console.log(ev)
    newCoords = ev.result.geometry.coordinates
  })

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(addLocation(newCoords))
    geocoder.clear()
    setShowForm(false)
  }

  return (
  <LocationFormStyle id="location-form" onSubmit={handleSubmit}>
    <div id="geocoder" ref={geocoderContainer} />
    <LocationFormInput id="date-visited" placeholder="Date Visited"/>
    <LocationButton type="submit">Submit</LocationButton>
  </LocationFormStyle>
  )
}

function FormWrapper() {
  const [showForm, setShowForm] = useState(false)
  return (
    <div>
      <Button onClick={() => { setShowForm(!showForm) }}>{showForm ? 'x Cancel' : '+ Add New Location'}</Button>
      {showForm && <LocationForm setShowForm={setShowForm}/>}
    </div>
  )
}

export default FormWrapper
