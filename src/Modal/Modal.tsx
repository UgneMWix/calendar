import styles from './Modal.module.css';
export function Modal({ callback }: { callback: () => void }) {
  return (
    <div>
      <section className={styles.modal}>
        <header className={styles['modal-header']}>
          <button className={styles['modal-close-button']} onClick={callback}>
            ✕
          </button>
        </header>
        <main className={styles['modal-main']}>
          <div className={styles['input-container']}>
            <input placeholder="Enter Title" className={styles['input-field']} type="text" />
            <label className={styles['input-label']}>Enter</label>
            <span className={styles['input-highlight']}></span>
          </div>
          <section className={styles['modal-time-flex-box']}>
            <img src="/clock.png" alt="clock icon" className={styles['modal-icons']} />
            <input className={styles['modal-time-date']} type="date" id="date-input" />
            <input className={styles['modal-time-start']} type="time" id="start-input" />
            <p>-</p>
            <input className={styles['modal-time-end']} type="time" id="end-input" />
          </section>
          <section className={styles['modal-location-flex-box']}>
            <img src="/location.png" alt="Location pin icon" className={styles['modal-icons']} />
            <input placeholder="Add location" className={styles['modal-location-text']} />
          </section>
          <section className={styles['modal-description-flex-box']}>
            <img src="/left-align.png" alt="left-aligned text icon" className={styles['modal-icons']} />
            <input className={styles['modal-description-text']} placeholder="Add description" />
          </section>
        </main>

        <footer className={styles['modal-footer']}>
          <button className={styles['modal-save-button']}>Save</button>
        </footer>
      </section>
      <div className={styles['overlay']}></div>
    </div>
  );
}
