import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DetailCard, Title } from './StyleElements'

function Details({title, date, placeName}) {
  return (
    <DetailCard>
      <Title>{title}</Title>
      <p>{placeName}</p>
      <p>Visited: {date}</p>
    </DetailCard>
  )
}

function EventDetails() {
  const [expand, setExpand] = useState(false)
  const [selected, setSelected] = useState({})
  const locations = useSelector(state => state.locations)

  const showDetails = (location) => {
    console.log('func')
    setExpand(!expand)
    setSelected(location)
    console.log(expand, selected)
  }

  console.log('rendered')
  return (
    <div>
      <h3>Events</h3>
      {/*Temp list of events until calendar is set up */}
      <ul>
        {locations.map((location, id) => {
          return (<li key={id} onClick={() => { setExpand() }}>{location.title}</li>)
        })}
      </ul>
      <h3>Event Details</h3>
      {expand.length && <Details location={ expand[1] } />}
    </div>
  )
}

export default EventDetails
