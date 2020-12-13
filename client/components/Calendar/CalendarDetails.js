import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './CalendarHeader';
import { CalendarStyle, DayNames, CalendarBody, Week } from './StyledElements';

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
    return value.isSame(day, 'day');
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, 'day');
  }

  function dayStyles(day) {
    if (isSelected(day, value)) return 'selected';
    if (isToday(day)) return 'today';
    return '';
  }

  return (
    <CalendarStyle>
      <Header value={value} onChange={onChange} />
      <CalendarBody>
        <DayNames>
          {['s', 'm', 't', 'w', 't', 'f', 's'].map((el) => (
            <Week key={el.dNum}>{ el }</Week>
          ))}
        </DayNames>
        {calendar.map((week) => (
          <div key={ week.weekNum }>
            {week.map((day) => (
              <div
                className="day"
                key={ day.dayNum }
                onClick={ () => { onChange(day) } }
              >
                <div className={ dayStyles(day) }>
                  { day.format('D').toString() }
                </div>
              </div>
            ))}
          </div>
        ))}
      </CalendarBody>
    </CalendarStyle>
  );
}
