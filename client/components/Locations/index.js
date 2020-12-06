import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
//import mapboxgl from 'mapbox-gl'
import { Card } from '../styledComponents/'
import { MAPBOXPK, mapBoxStyleURL } from '../../../constants'
import { generateJSONFeatures } from '../../utils'
import Axios from 'axios'

window.mapboxgl.accessToken = MAPBOXPK

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
  // const locations = useSelector(state => state.locations)
  const [locations, setLocations] = useState([])
  console.log(locations)
  const mapContainerRef = useRef(null)
  //helper function that takes array of coordinates and turns it into
  //specifically formatted JSON for geographic information
  // const geoJSONSource = generateJSONFeatures(locations)

  useEffect(() => {
    const map = new window.mapboxgl.Map({
    container: mapContainerRef.current,
    style: mapBoxStyleURL,
    center: [-73.94, 40.73],
    zoom: 10
    });
    const getLocations = async() => {
      const userLocations = await Axios.get('api/user/getLocations')
      setLocations(userLocations.data)
    }
    getLocations()
    console.log(locations)
    const geoJSONSource = generateJSONFeatures(locations)
    map.on('load', () => {
      //source with visited locations to render
      map.addSource('visited-locations-data', geoJSONSource)
      //layer on map that renders source
      map.addLayer(sourceData)
    })

    return () => map.remove()

  }, [])

  return (
    <Card>
      <div className="map-container" ref={mapContainerRef} />
    </Card>
  )
}

export default Locations
