import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from '../styledComponents/'
import { mapBoxStyleURL } from '../../../constants'
import { generateJSONFeatures } from '../../utils'
import {getLocations} from '../../redux/userLocations'

window.mapboxgl.accessToken = process.env.MAPBOXPK

//object formatted for mapbox Map
const sourceData = {
  id: 'visited-locations-layer',
  source: 'visited-locations-data',
  type: 'symbol',
  layout: {
    'icon-image': 'za-provincial-2',
    'icon-anchor': 'bottom',
    'icon-allow-overlap': true,
  }
}

function Locations() {
  const locations = useSelector(state => state.locations)
  const userId = useSelector(state => state.loginStatus.userId)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userId) {
      dispatch(getLocations(userId))
    }
  }, [userId])
  const mapContainerRef = useRef(null)
  //helper function that takes array of coordinates and turns it into
  //specifically formatted JSON for geographic information
  const geoJSONSource = generateJSONFeatures(locations)

  useEffect(() => {
    const map = new window.mapboxgl.Map({
    container: mapContainerRef.current,
    style: mapBoxStyleURL,
    center: [-73.94, 40.73],
    zoom: 10
    });

    map.on('load', () => {
      //source with visited locations to render
      map.addSource('visited-locations-data', geoJSONSource)
      //layer on map that renders source
      map.addLayer(sourceData)
    })

    return () => map.remove()
  })

  return (
    <Card>
      <div className="map-container" ref={mapContainerRef} />
    </Card>
  )
}

export default Locations
