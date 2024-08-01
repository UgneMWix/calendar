import styles from './Sidebar.module.css';
import { MiniCalendar } from '../MiniCalendar/MiniCalendar';
function Sidebar() {
  return (
    <aside>
      <button className={styles['event-button']}>Create Event</button>
      <MiniCalendar />
    </aside>
  );
}
export default Sidebar;
