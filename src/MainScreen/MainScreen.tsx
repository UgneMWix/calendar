import Sidebar from '../Sidebar/Sidebar';
import { Calendar } from '../Calendar/Calendar';
import EventObject from '../dbObject';
function MainScreen({
  openModal,
  toggleModal,
  events,
}: {
  openModal: (dateISO?: string) => void;
  toggleModal: () => void;
  events: EventObject[];
}) {
  return (
    //remove togglemodal
    <main>
      <Sidebar toggleModal={toggleModal} />
      <Calendar openModal={openModal} events={events} />
    </main>
  );
}
export default MainScreen;
