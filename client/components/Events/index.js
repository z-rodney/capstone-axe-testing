import React from 'react';
import AddEvent from './EventForm';
import Calendar from '../Calendar';
import { Card } from '../styledComponents';

function Events() {
  return (
    <Card>
      <Calendar />
      <AddEvent />
    </Card>
  );
}

export default Events;
