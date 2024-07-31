import styles from './App.module.css';
function Calendar() {
  return (
    <>
      <section className={styles['main-calendar']}>
        <header className={styles['main-calendar-header']}></header>
        <section className={styles['calendar-time-line-and-squares']}>
          <section className={styles['time-line']}></section>
          <section id={styles['time-table']}></section>
        </section>
      </section>
    </>
  );
}
export default Calendar;
