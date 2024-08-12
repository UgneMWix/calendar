import cn from 'classnames';
import styles from './MiniCalendar.module.css';
import {
  generateNDays,
  generateWeek,
  getFirstDayOfTheMonth,
  getFirstDayOfWeek,
  getMonthFromDate,
  getYearFromDate,
} from '../utils/date';
import { useState } from 'react';
export function MiniCalendar({ setChosenDay }: { setChosenDay: (date: string) => void }) {
  const [refDate, setRefDate] = useState(new Date().toISOString());
  const firstDayOfWeek = getFirstDayOfWeek(getFirstDayOfTheMonth(new Date(refDate).toISOString()));

  function handleClick(direction: 'back' | 'forward') {
    const date = new Date(refDate);
    direction === 'back' ? date.setUTCMonth(date.getUTCMonth() - 1) : date.setUTCMonth(date.getUTCMonth() + 1);
    setRefDate(date.toISOString());
  }
  return (
    <div>
      <header className={styles['calendar-header']}>
        <p className={styles['calendar-text']}>
          {getMonthFromDate(refDate)} {getYearFromDate(refDate)}
        </p>
        <section className={styles['calendar-button-group']}>
          <button className={styles['calendar-buttons']} id="arrow-prev" onClick={() => handleClick('back')}>
            <img src="/arrow.png" alt="arrow back in calendar" className={styles['calendar-arrow-1']} />
          </button>
          <button className={styles['calendar-buttons']} id="arrow-next" onClick={() => handleClick('forward')}>
            <img src="/arrow.png" alt="arrow forward in calendar" className={styles['calendar-arrow-2']} />
          </button>
        </section>
      </header>
      <div className={styles.calendar}>
        {generateWeek(getFirstDayOfWeek(refDate)).map((day) => {
          const dayName = new Date(day).toLocaleDateString(undefined, { weekday: 'short' })[0];
          return (
            <div key={day} className={styles['day']}>
              {dayName}
            </div>
          );
        })}
        {generateNDays(35, firstDayOfWeek).map((dayISO) => {
          const day = new Date(dayISO).getUTCDate();
          const month = new Date(dayISO).getUTCMonth();
          const year = new Date(dayISO).getUTCFullYear();
          const today = new Date();
          return (
            <div
              className={cn(styles['day'], {
                [styles['current-day']]:
                  day === today.getDate() && month === today.getUTCMonth() && year === today.getUTCFullYear(),
                [styles['other-day']]: month !== new Date(refDate).getUTCMonth(),
              })}
              key={dayISO}
              onClick={() => setChosenDay(dayISO)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
