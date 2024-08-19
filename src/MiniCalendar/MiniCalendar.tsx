import cn from 'classnames';
import styles from './MiniCalendar.module.css';
import {
  areDaysTheSame,
  areMonthsTheSame,
  generateNDays,
  generateWeek,
  getComponentsFromDate,
  getDayOfWeekName,
  getFirstDayOfTheMonth,
  getFirstDayOfWeek,
  getMonthFromDate,
  getToday,
  getYearFromDate,
  monthArithmetic,
} from '../utils/date';
import { useState } from 'react';
export function MiniCalendar({ setChosenDay }: { setChosenDay: (date: string) => void }) {
  const [refDate, setRefDate] = useState(getToday());
  const firstDayOfWeek = getFirstDayOfWeek(getFirstDayOfTheMonth(refDate));

  function handleClick(direction: number) {
    setRefDate(monthArithmetic(refDate, direction));
  }
  return (
    <div>
      <header className={styles['calendar-header']}>
        <p className={styles['calendar-text']}>
          {getMonthFromDate(refDate)} {getYearFromDate(refDate)}
        </p>
        <section className={styles['calendar-button-group']}>
          <button className={styles['calendar-buttons']} id="arrow-prev" onClick={() => handleClick(-1)}>
            <img src="/arrow.png" alt="arrow back in calendar" className={styles['calendar-arrow-1']} />
          </button>
          <button className={styles['calendar-buttons']} id="arrow-next" onClick={() => handleClick(1)}>
            <img src="/arrow.png" alt="arrow forward in calendar" className={styles['calendar-arrow-2']} />
          </button>
        </section>
      </header>
      <div className={styles.calendar}>
        {generateWeek(getFirstDayOfWeek(refDate)).map((day) => {
          return (
            <div key={day} className={styles['day']}>
              {getDayOfWeekName(day, 'narrow')}
            </div>
          );
        })}
        {generateNDays(35, firstDayOfWeek).map((dayISO) => {
          return (
            <div
              className={cn(styles['day'], {
                [styles['current-day']]: areDaysTheSame(dayISO, getToday()),
                [styles['other-day']]: !areMonthsTheSame(dayISO, refDate),
              })}
              key={dayISO}
              onClick={() => setChosenDay(dayISO)}
            >
              {getComponentsFromDate(dayISO).day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
