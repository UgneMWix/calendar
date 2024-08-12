import Sidebar from '../Sidebar/Sidebar';
import { Calendar } from '../Calendar/Calendar';
import EventObject from '../dbObject';
function MainScreen({
  openModal,
  toggleModal,
  events,
  chosenDay,
}: {
  openModal: (dateISO?: string) => void;
  toggleModal: () => void;
  events: EventObject[];
  chosenDay: string;
}) {
  return (
    //remove togglemodal
    <main>
      <Sidebar toggleModal={toggleModal} />
      <Calendar openModal={openModal} events={events} chosenDay={chosenDay} />
    </main>
  );
}
export default MainScreen;
