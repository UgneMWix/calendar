import styles from './Header.module.css';
import { getToday, incrementDateByDays, getComponentsFromDate, getMonthName } from '../utils/date';
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
      <button className={styles['header-buttons']} onClick={() => setChosenDay(incrementDateByDays(chosenDay, -7))}>
        <img src="/arrow.png" alt="arrow to the left" className={styles['arrow-image-1']} />
      </button>
      <button
        className={styles['header-buttons']}
        onClick={() => {
          setChosenDay(incrementDateByDays(chosenDay, 7));
        }}
      >
        <img src="/arrow.png" alt="arrow to the right" className={styles['arrow-image-2']} />
      </button>
      <span className={styles['mon-year-text']}>
        {getMonthName(getComponentsFromDate(chosenDay).month, 'short')} {getComponentsFromDate(chosenDay).year}
      </span>{' '}
      <button className={styles['today-button']} onClick={() => setChosenDay(getToday())}>
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
