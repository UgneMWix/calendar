import styles from './stylesheets/App.module.css';
import MiniCalendar from './MiniCalendar';
function SideBar() {
  return (
    <aside>
      <button className={styles['event-button']}>Create Event</button>
      <section className={styles['calendar-base']}>
        <MiniCalendar />
      </section>
    </aside>
  );
}
export default SideBar;
