import React from 'react'
import AddEvent from './EventForm'
import { Card } from '../styledComponents'

function Events() {
  return (
    <Card>
      <AddEvent />
      <div>
        <p>Calendar to go here</p>
      </div>
    </Card>
  )
}

export default Events
