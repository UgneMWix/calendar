import styles from './App.module.css';
function GenerateWeekTitle({ date }: { date: Date }) {
  if (date.getDate() === new Date().getDate()) {
    return (
      <p className={`${styles['main-calendar-number']} ${styles['main-calendar-today']}`}>
        {date.getDate().toString()}
      </p>
    );
  } else {
    return <p className={styles['main-calendar-number']}>{date.getDate().toString()}</p>;
  }
}
export default GenerateWeekTitle;
