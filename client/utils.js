export const generateJSONFeatures = (locations) => {
  const geoJSONData = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  }

  locations.forEach((loc, id) => {
    geoJSONData.data.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: loc,
        },
        properties: {
          id,
          name: `Random Point #${id}`,
          description: `description for Random Point #${id}`,
        },
    })
    }
  )
  return geoJSONData
}
