import styles from './TimeLine.module.css';
import { generateHoursOfTheDay } from '../../utils/date';
export function TimeLine() {
  return generateHoursOfTheDay(new Date().toISOString()).map((value) => {
    const hour = new Date(value).getUTCHours();
    return (
      <div className={styles['calendar-time-line']} key={value}>
        <p className={styles['label']}>{hour.toString().padStart(2, '0')}:00</p>
      </div>
    );
  });
}
