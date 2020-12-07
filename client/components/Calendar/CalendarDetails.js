import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './CalendarHeader';
import './styles.css';

export default function CalendarDetails({ value, onChange }) {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  function buildCalendar(date) {
    const cal = [];

    const startDay = date.clone().startOf('month').startOf('week');
    const endDay = date.clone().endOf('month').endOf('week');

    const day = startDay.clone().subtract(1, 'day');

    while (day.isBefore(endDay, 'day')) {
      cal.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      );
    }
    return cal;
  }

  function isSelected(day) {
    // console.log(` day: ${day}, value: ${value}`);
    return value.isSame(day, 'day');
  }

  function beforeToday(day) {
    return moment(day).isBefore(new Date(), 'day');
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, 'day');
  }

  function dayStyles(day) {
    if (beforeToday(day)) return 'before';
    if (isSelected(day, value)) return 'selected';
    if (isToday(day)) return 'today';
    return '';
  }

  // function currMonthName() {
  //   return value.format('MMMM');
  // }

  // function currYear() {
  //   return value.format('YYYY');
  // }

  return (
    <div className="calendar">
      <Header value={value} onChange={onChange} />

      <div className="body">
        <div className="day-names">
          {['s', 'm', 't', 'w', 't', 'f', 's'].map((el) => (
            <div className="week" key={el.dNum}>
              {el}
            </div>
          ))}
        </div>
        {calendar.map((week) => (
          <div key={week.weekNum}>
            {week.map((day) => (
              <div
                key={day.dayNum}
                className="day"
                onClick={() => {
                  if (day < moment(new Date()).startOf('day')) return;
                  onChange(day);
                }}
              >
                <div className={dayStyles(day)}>
                  {day.format('D').toString()}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
