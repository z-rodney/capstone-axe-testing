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
        <Calendar />
      </div>
      <EventDetails />
    </Card>
  );
}

export default Events;
