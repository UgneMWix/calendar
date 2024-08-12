import styles from './Sidebar.module.css';
import { MiniCalendar } from '../MiniCalendar/MiniCalendar';
function Sidebar({ toggleModal, setChosenDay }: { toggleModal: () => void; setChosenDay: (date: string) => void }) {
  return (
    <aside>
      <button className={styles['event-button']} onClick={toggleModal}>
        Create Event
      </button>
      <MiniCalendar setChosenDay={setChosenDay} />
    </aside>
  );
}
export default Sidebar;
