import Sidebar from '../Sidebar/Sidebar';
import { Calendar } from '../Calendar/Calendar';
function MainScreen({ openModal, toggleModal }: { openModal: (dateISO?: string) => void; toggleModal: () => void }) {
  return (
    //remove togglemodal
    <main>
      <Sidebar toggleModal={toggleModal} />
      <Calendar openModal={openModal} />
    </main>
  );
}
export default MainScreen;
