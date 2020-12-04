import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
//import mapboxgl from 'mapbox-gl'
import { Card } from '../styledComponents/'
import { MAPBOXPK, mapBoxStyleURL } from '../../../constants'
import { generateJSONFeatures } from '../../utils'

mapboxgl.accessToken = MAPBOXPK

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
  const mapContainerRef = useRef(null)
  //helper function that takes array of coordinates and turns it into
  //specifically formatted JSON for geographic information
  const geoJSONSource = generateJSONFeatures(locations)

  useEffect(() => {
    const map = new mapboxgl.Map({
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
