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

  return (
    <div>
      <h3>Events</h3>
      {/*Temp list of events until calendar is set up */}
      <ul>
        {locations.map((current, id) => {
          return (<li key={id} onClick={() => { showDetails(current) }}>{current.location.title}</li>)
        })}
      </ul>

      <h3>Event Details</h3>
      {expand &&
        <DetailCard>
          <Title>{selected.location.title}</Title>
          <p>{selected.location.placeName}</p>

          <p>Visited: {selected.dateVisited}</p>
        </DetailCard>
      }
    </div>
  )
}

export default EventDetails
