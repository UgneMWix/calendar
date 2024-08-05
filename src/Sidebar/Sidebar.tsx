import styles from './Sidebar.module.css';
import { MiniCalendar } from '../MiniCalendar/MiniCalendar';
function Sidebar({ toggleModal }: { toggleModal: () => void }) {
  return (
    <aside>
      <button className={styles['event-button']} onClick={toggleModal}>
        Create Event
      </button>
      <MiniCalendar />
    </aside>
  );
}
export default Sidebar;
