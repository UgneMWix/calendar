import styles from './stylesheets/MiniCalendar.module.css';
function MiniCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month, lastDate).getDay();

  const prevMonthLastDate = new Date(year, month, 0).getDate();
  function addPreviousMonthDays() {
    const previousMonthDays = [];
    for (let i = firstDay; i > 0; i--) {
      previousMonthDays.push(
        <div className={`${styles['day']} ${styles['other-day']}`} key={i + 7}>
          {prevMonthLastDate - i + 1}
        </div>,
      );
    }
    return previousMonthDays;
  }
  function addCurrentMonthDays() {
    const currentMonthDays = [];
    for (let i = 1; i <= lastDate; i++) {
      if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
        currentMonthDays.push(
          <div className={`${styles['day']} ${styles['current-day']}`} key={i + firstDay + 7}>
            {i}
          </div>,
        );
      } else {
        currentMonthDays.push(
          <div className={styles['day']} key={i + firstDay + 7}>
            {i}
          </div>,
        );
      }
    }
    console.log(currentMonthDays);
    console.log(lastDate);
    return currentMonthDays;
  }
  function addNextMonthDays() {
    const nextMonthDays = [];
    for (let i = lastDay; i < 6; i++) {
      nextMonthDays.push(
        <div className={`${styles['day']} ${styles['other-day']}`} key={i + lastDate + 7}>
          {i - lastDay + 1}
        </div>,
      );
    }
    return nextMonthDays;
  }
  function addHeader(weekDays: string[]) {
    const header = [];
    for (let i = 0; i < weekDays.length; i++) {
      header.push(
        <div className={styles['day']} key={i}>
          {weekDays[i].substring(0, 1)}
        </div>,
      );
    }
    return header;
  }
  function mergeAll() {
    return addHeader(weekDays).concat(addPreviousMonthDays().concat(addCurrentMonthDays().concat(addNextMonthDays())));
  }
  return (
    <>
      <header className={styles['calendar-header']}>
        <p className={styles['calendar-text']}>
          {months[month]} {year}
        </p>
        <section className={styles['calendar-button-group']}>
          <button className={styles['calendar-buttons']} id="arrow-prev">
            <img src="/arrow.png" alt="arrow back in calendar" className={styles['calendar-arrow-1']} />
          </button>
          <button className={styles['calendar-buttons']} id="arrow-next">
            <img src="/arrow.png" alt="arrow forward in calendar" className={styles['calendar-arrow-2']} />
          </button>
        </section>
      </header>
      <div className={styles.calendar}>{mergeAll()}</div>
    </>
  );
}
export default MiniCalendar;
