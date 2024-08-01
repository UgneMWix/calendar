import styles from './Calendar.module.css';

import { generateHoursOfTheDay, generateWeek, getFirstDayOfWeek } from '../utils/date';
import { Header } from './Header/Header';
import { TimeLine } from './TimeLine/TimeLine';

export function Calendar() {
  return (
    <section className={styles['main-calendar']}>
      <Header />
      <section className={styles['calendar-time-line-and-squares']}>
        <section className={styles['time-line']}>
          <TimeLine />
        </section>
        <section className={styles['time-table']}>
          {generateWeek(getFirstDayOfWeek(new Date().toISOString()))
            .flatMap((value) => generateHoursOfTheDay(value))
            .map((value) => (
              <Square key={value} />
            ))}
        </section>
      </section>
    </section>
  );
}

function Square() {
  return <div className={styles['calendar-square']}></div>;
}
