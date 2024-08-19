import styles from './TimeLine.module.css';
import { generateHoursOfTheDay, getComponentsFromDate, getToday } from '../../utils/date';
export function TimeLine() {
  return generateHoursOfTheDay(getToday()).map((value) => {
    const hour = getComponentsFromDate(value).hour;
    return (
      <div className={styles['calendar-time-line']} key={value}>
        <p className={styles['label']}>{hour.toString().padStart(2, '0')}:00</p>
      </div>
    );
  });
}
