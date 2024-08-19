import styles from './TimeLine.module.css';
import { generateHoursOfTheDay, getDateObjectFromString, getToday } from '../../utils/date';
export function TimeLine() {
  return generateHoursOfTheDay(getToday()).map((value) => {
    const hour = getDateObjectFromString(value).getUTCHours();
    return (
      <div className={styles['calendar-time-line']} key={value}>
        <p className={styles['label']}>{hour.toString().padStart(2, '0')}:00</p>
      </div>
    );
  });
}
