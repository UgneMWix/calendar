import cn from 'classnames';
import styles from './MiniCalendar.module.css';
import { generateNDays, generateWeek, getFirstDayOfTheMonth, getFirstDayOfWeek } from '../utils/date';
import { useState } from 'react';
export function MiniCalendar() {
  const [refDate, setRefDate] = useState(new Date().toISOString());
  // console.log(getFirstDayOfTheMonth('2024-08-09T00:00:00.000Z'));
  const firstDayOfWeek = getFirstDayOfWeek(getFirstDayOfTheMonth(new Date().toISOString()));
  return (
    <div>
      <header className={styles['calendar-header']}>
        <p className={styles['calendar-text']}>{/* {months[month]} {year} */} June 2024</p>
        <section className={styles['calendar-button-group']}>
          <button className={styles['calendar-buttons']} id="arrow-prev">
            <img src="/arrow.png" alt="arrow back in calendar" className={styles['calendar-arrow-1']} />
          </button>
          <button className={styles['calendar-buttons']} id="arrow-next">
            <img src="/arrow.png" alt="arrow forward in calendar" className={styles['calendar-arrow-2']} />
          </button>
        </section>
      </header>
      <div className={styles.calendar}>
        {generateWeek(getFirstDayOfWeek(refDate)).map((day) => {
          const dayName = new Date(day).toLocaleDateString(undefined, { weekday: 'short' }).substring(0, 1);
          return (
            <div key={dayName} className={styles['day']}>
              {dayName}
            </div>
          );
        })}
        {generateNDays(35, firstDayOfWeek).map((dayISO) => {
          const day = new Date(dayISO).getUTCDate();
          const month = new Date(dayISO).getUTCMonth();
          return (
            <div
              className={cn(styles['day'], {
                [styles['current-day']]: day === new Date().getUTCDate(),
                [styles['other-day']]: month !== new Date(refDate).getUTCMonth(),
              })}
              key={dayISO}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
