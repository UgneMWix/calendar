import styles from './Calendar.module.css';

import { generateHoursOfTheDay, generateWeek, getFirstDayOfWeek } from '../utils/date';
import { Header } from './Header/Header';
import { TimeLine } from './TimeLine/TimeLine';

export function Calendar({ callback }: { callback: () => void }) {
  function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    callback();
    const target = e.target as HTMLElement;
    console.log(target.dataset.day);
  }

  return (
    <section className={styles['main-calendar']}>
      <Header />
      <section className={styles['calendar-time-line-and-squares']}>
        <section className={styles['time-line']}>
          <TimeLine />
        </section>
        <section className={styles['time-table']} onClick={(e) => handleClick(e)}>
          {generateWeek(getFirstDayOfWeek(new Date().toISOString()))
            .flatMap((value) => generateHoursOfTheDay(value))
            .map((value) => (
              <Square data={value} key={value} />
            ))}
        </section>
      </section>
    </section>
  );
}

function Square({ data }: { data: string }) {
  return <div className={styles['calendar-square']} data-day={data}></div>;
}
