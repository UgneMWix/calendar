import styles from './Header.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { generateWeek, getFirstDayOfWeek } from '../../utils/date';
const HeaderElement: FC<{ day: string }> = ({ day }) => {
  const date = new Date(day);
  const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
  const isToday =
    date.getDate() === new Date().getDate() &&
    date.getFullYear() === new Date().getFullYear() &&
    date.getMonth() === new Date().getMonth();

  return (
    <div className={styles['main-calendar-day']}>
      <p className={styles['main-calendar-day-name']}>{dayName}</p>
      <p
        className={cn(styles['main-calendar-number'], {
          [styles['main-calendar-today']]: isToday,
        })}
      >
        {date.getDate().toString()}
      </p>
    </div>
  );
};
export function Header({ chosenDay }: { chosenDay: string }) {
  const week = generateWeek(getFirstDayOfWeek(new Date(chosenDay).toISOString()));
  return (
    <header className={styles['main-calendar-header']}>
      {week.map((dayFull) => (
        <HeaderElement day={dayFull} key={dayFull} />
      ))}
    </header>
  );
}
