import styles from './Sidebar.module.css';
import { MiniCalendar } from '../MiniCalendar/MiniCalendar';
function Sidebar({ callback }: { callback: () => void }) {
  return (
    <aside>
      <button className={styles['event-button']} onClick={callback}>
        Create Event
      </button>
      <MiniCalendar />
    </aside>
  );
}
export default Sidebar;
