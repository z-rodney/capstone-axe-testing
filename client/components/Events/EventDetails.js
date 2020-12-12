import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DetailCard, Title } from './StyleElements'
import {getLocations} from '../../redux/userLocations'

function EventDetails() {
  const locations = useSelector(state => state.locations)
  const userId = useSelector(state => state.loginStatus.userId)
  const [expand, setExpand] = useState(false)
  const [selected, setSelected] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if (userId) {
      dispatch(getLocations(userId))
    }
  }, [userId])


 const showDetails = (location) => {
   setExpand(true)
   setSelected(location)
 }

  const eventItem = (current, id) => {
    return (
      <li
        key={id}
        onClick={() => { showDetails(current) }}
      >
        {current.location.title}
      </li>
    )
  }

  return (
    <div>
      <h3>Events</h3>
      {/*Temp list of events until calendar is set up */}
      <ul>
        {locations.map(eventItem)}
      </ul>

      <h3>Event Details</h3>
      {expand ?
        <DetailCard>
          <Title>{selected.location.title}</Title>
          <p>{selected.location.placeName}</p>
          <p>Visited: {selected.dateVisited.visitedDate}</p>
        </DetailCard> :
        <p>Select an event to see details.</p>
      }
    </div>
  )
}

export default EventDetails
