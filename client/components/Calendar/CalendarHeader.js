import React from 'react';
import { Previous, Next } from './StyledElements';

export default function CalendarHeader({ value, onChange }) {
  function currMonthName() {
    return value.format('MMMM');
  }

  function currYear() {
    return value.format('YYYY');
  }

  function prevMonth() {
    return value.clone().subtract(1, 'month');
  }

  function nextMonth() {
    return value.clone().add(1, 'month');
  }

  return (
    <div className="header">
      <Previous onClick={() => onChange(prevMonth())}>
        {String.fromCharCode(171)}
      </Previous>
      <div>
        {currMonthName()} {currYear()}
      </div>
      <Next onClick={() => onChange(nextMonth())}>
        {String.fromCharCode(187)}
      </Next>
    </div>
  );
}
