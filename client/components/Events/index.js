import React from 'react';
import AddEvent from './EventForm';
import Calendar from '../Calendar';
import { Card } from '../styledComponents';

function Events() {
  return (
    <Card>
      <AddEvent />
      <Calendar />
    </Card>
  );
}

export default Events;
