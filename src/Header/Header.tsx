import styles from './Header.module.css';
import { getMonthFromDate, getYearFromDate } from '../utils/date';
function Header({
  clearEvents,
  chosenDay,
  setChosenDay,
  toggleDarkmode,
}: {
  clearEvents: () => void;
  chosenDay: string;
  setChosenDay: (date: string) => void;
  toggleDarkmode: () => void;
}) {
  const day = new Date(chosenDay);
  return (
    <header className={styles['page-header']}>
      <button className={styles['header-buttons']}>
        <img src="/menu.png" className={styles['menu-button-image']} />
      </button>
      <span className={styles['header-title']}>Calendar</span>
      <button className={styles['today-button']} onClick={clearEvents}>
        {' '}
        Clear
      </button>
      <button
        className={styles['header-buttons']}
        onClick={() => setChosenDay(new Date(day.getFullYear(), day.getMonth(), day.getDate() - 7).toISOString())}
      >
        <img src="/arrow.png" alt="arrow to the left" className={styles['arrow-image-1']} />
      </button>
      <button
        className={styles['header-buttons']}
        onClick={() => {
          setChosenDay(new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7).toISOString());
        }}
      >
        <img src="/arrow.png" alt="arrow to the right" className={styles['arrow-image-2']} />
      </button>
      <span className={styles['mon-year-text']}>
        {getMonthFromDate(chosenDay)} {getYearFromDate(chosenDay)}
      </span>{' '}
      <button className={styles['today-button']} onClick={() => setChosenDay(new Date().toISOString())}>
        Today
      </button>
      <button className={styles['week-menu-button']}>Week ▾</button>
      <button className={styles['darkmode-button']} onClick={() => toggleDarkmode()}>
        🌙
      </button>
    </header>
  );
}
export default Header;
