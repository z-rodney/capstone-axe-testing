import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DetailCard, Title } from './StyleElements'

function EventDetails() {
  const locations = useSelector(state => state.locations)
  const [expand, setExpand] = useState(false)
  const [selected, setSelected] = useState({})

 const showDetails = (location) => {
   setExpand(true)
   setSelected(location)
  }

  return (
    <div>
      <h3>Events</h3>
      {/*Temp list of events until calendar is set up */}
      <ul>
        {locations.map((location, id) => {
          return (<li key={id} onClick={() => { showDetails(location) }}>{location.title}</li>)
        })}
      </ul>

      <h3>Event Details</h3>
      {expand &&
        <DetailCard>
          <Title>{selected.title}</Title>
          <p>{selected.placeName}</p>
          <p>Visited: {selected.date}</p>
        </DetailCard>
      }
    </div>
  )
}

export default EventDetails
