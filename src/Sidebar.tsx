import styles from './stylesheets/App.module.css';
function SideBar() {
  return (
    <>
      <aside>
        <button className={styles['event-button']}>Create Event</button>
        <section className={styles['calendar-base']}>
          <header className={styles['calendar-header']}>
            <p className={styles['calendar-text']}></p>
            <section className={styles['calendar-button-group']}>
              <button className={styles['calendar-buttons']} id="arrow-prev">
                <img src="public/arrow.png" alt="arrow back in calendar" className={styles['calendar-arrow-1']} />
              </button>
              <button className={styles['calendar-buttons']} id="arrow-next">
                <img src="public/arrow.png" alt="arrow forward in calendar" className={styles['calendar-arrow-2']} />
              </button>
            </section>
          </header>
          <div className={styles['calendar']}></div>
        </section>
      </aside>
    </>
  );
}
export default SideBar;
