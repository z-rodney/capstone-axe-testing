import React from 'react';
import AddEvent from './EventForm';
import EventDetails from './EventDetails';
import Calendar from '../Calendar';
import { Card } from '../styledComponents';

function Events() {
  return (
    <Card>
      <AddEvent />
      <div>
        <p>Calendar to go here</p>
        <Calendar />
      </div>
      <EventDetails />
    </Card>
  );
}

export default Events;
