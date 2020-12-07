import React, { useState } from 'react';
import moment from 'moment';
import CalendarDetails from './CalendarDetails';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(moment());
  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <CalendarDetails value={selectedDate} onChange={setSelectedDate} />
    </div>
  );
}

export default Calendar;
