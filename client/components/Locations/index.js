import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import { MAPBOXPK, mapBoxStyleURL } from '../../../constants'
import { Card } from '../styledComponents/'
import { generateJSONFeatures } from '../../utils'

mapboxgl.accessToken = MAPBOXPK

const sourceData = {
  id: 'visited-locations-layer',
  source: 'visited-locations-data',
  type: 'symbol',
  layout: {
    "icon-image": "za-provincial-2",
    "icon-anchor": "bottom",
    "icon-allow-overlap": true,
  }
}

function Locations() {
  const locations = useSelector(state => state.locations)
  const mapContainerRef = useRef(null)
  const geoJSONSource = generateJSONFeatures(locations)

  useEffect(() => {
    const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: mapBoxStyleURL,
    center: [-73.94, 40.73],
    zoom: 10
    });

    map.on("load", () => {
      map.addSource('visited-locations-data', geoJSONSource)
      map.addLayer(sourceData)
    })

    return () => map.remove()
  }, [])

  return (
    <Card>
      <p>+ Add New Location</p>
      <div className="map-container" ref={mapContainerRef} />
    </Card>
  )
}

export default Locations


/*<Map
        style={mapBoxStyleURL}
        containerStyle={{
          height: '40vh',
          width: '50vw'
        }}
        center={[-73.94, 40.73]}
        zoom={[10]}
      >
        <Layer
          type="symbol"
          id="markers"
          layout={{
            "icon-image": "za-provincial-2",
            "icon-anchor": "bottom",
            "text-field": "Visited"
          }}
        >
          {userLocations.map(coords => {
            return (
              <Feature coordinates={coords}/>
              )
            })}
          <Feature coordinates={[-73.96666700000003, 40.785167]} />
          <Feature coordinates={[-73.96900904305689, 40.6627416764545]} />
          <Feature coordinates={[-73.92555771551504, 40.87191365945296]} />
        </Layer>
      </Map>*/
