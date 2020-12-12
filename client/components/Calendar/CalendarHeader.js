import React from 'react';

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
      <div
        className="previous"
        onClick={() => onChange(prevMonth())}
      >
        {String.fromCharCode(171)}
      </div>
      <div className="current">
        {currMonthName()} {currYear()}
      </div>
      <div className="next" onClick={() => onChange(nextMonth())}>
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}
