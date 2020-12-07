export const generateJSONFeatures = (locations) => {
  const geoJSONData = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  }
  locations.forEach((locData) => {
    geoJSONData.data.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: locData.location.coordinates,
        },
        properties: {
          title: locData.location.title,
          date: locData.dateVisited.VisitedDate,
          // description: `description for Random Point #${id}`,
        },
    })
  })
  return geoJSONData
}
