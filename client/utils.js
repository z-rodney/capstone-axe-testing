export const generateJSONFeatures = (locations) => {
  const geoJSONData = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  }

  locations.forEach((locData, id) => {
    geoJSONData.data.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: locData.coordinates,
        },
        properties: {
          id,
          name: `Random Point #${id}`,
          date: locData.date,
          description: `description for Random Point #${id}`,
        },
    })
    }
  )
  return geoJSONData
}
