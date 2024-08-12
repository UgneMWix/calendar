import Sidebar from '../Sidebar/Sidebar';
import { Calendar } from '../Calendar/Calendar';
import EventObject from '../dbObject';
function MainScreen({
  openModal,
  toggleModal,
  events,
  chosenDay,
  setChosenDay,
}: {
  openModal: (dateISO?: string) => void;
  toggleModal: () => void;
  events: EventObject[];
  chosenDay: string;
  setChosenDay: (date: string) => void;
}) {
  return (
    //remove togglemodal
    <main>
      <Sidebar toggleModal={toggleModal} setChosenDay={setChosenDay} />
      <Calendar openModal={openModal} events={events} chosenDay={chosenDay} />
    </main>
  );
}
export default MainScreen;
