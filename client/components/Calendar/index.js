import React, { useState } from 'react';
import moment from 'moment';
import CalendarDetails from './CalendarDetails';
import EventDetails from '../Events/EventDetails';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(moment());
  return (
    <div className="calendar">
      <CalendarDetails value={ selectedDate } onChange={ setSelectedDate } />
      <EventDetails dateSelected={ selectedDate } />
    </div>
  );
}

export default Calendar;
