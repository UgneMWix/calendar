import styles from './Header.module.css';
function Header({ clearEvents }: { clearEvents: () => void }) {
  return (
    <header className={styles['page-header']}>
      <button className={styles['header-buttons']}>
        <img src="/menu-dashes.png" className={styles['menu-button-image']} />
      </button>
      <span className={styles['header-title']}>Calendar</span>
      <button className={styles['today-button']} onClick={clearEvents}>
        {' '}
        Clear
      </button>
      <button className={styles['header-buttons']}>
        <img src="/arrow.png" alt="arrow to the left" className={styles['arrow-image-1']} />
      </button>
      <button className={styles['header-buttons']}>
        <img src="/arrow.png" alt="arrow to the right" className={styles['arrow-image-2']} />
      </button>
      <span className={styles['mon-year-text']}>May 2024</span>
      <button className={styles['week-menu-button']}>Week ▾</button>
    </header>
  );
}
export default Header;
