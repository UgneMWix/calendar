import styles from './Header.module.css';
import cn from 'classnames';
import { FC } from 'react';
import {
  areDaysTheSame,
  generateWeek,
  getComponentsFromDate,
  getDayOfWeekName,
  getFirstDayOfWeek,
  getToday,
} from '../../utils/date';
const HeaderElement: FC<{ day: string }> = ({ day }) => {
  return (
    <div className={styles['main-calendar-day']}>
      <p className={styles['main-calendar-day-name']}>{getDayOfWeekName(day, 'short')}</p>
      <p
        className={cn(styles['main-calendar-number'], {
          [styles['main-calendar-today']]: areDaysTheSame(day, getToday()),
        })}
      >
        {getComponentsFromDate(day).day}
      </p>
    </div>
  );
};
export function Header({ chosenDay }: { chosenDay: string }) {
  const week = generateWeek(getFirstDayOfWeek(chosenDay));
  return (
    <header className={styles['main-calendar-header']}>
      {week.map((dayFull) => (
        <HeaderElement day={dayFull} key={dayFull} />
      ))}
    </header>
  );
}
