import React from 'react'
import AddEvent from './EventForm'
import EventDetails from './EventDetails'
import { Card } from '../styledComponents'

function Events() {
  return (
    <Card>
      <AddEvent />
      <div>
        <p>Calendar to go here</p>
      </div>
      <EventDetails />
    </Card>
  )
}

export default Events
