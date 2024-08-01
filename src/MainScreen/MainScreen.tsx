import Sidebar from '../Sidebar/Sidebar';
import { Calendar } from '../Calendar/Calendar';
function MainScreen({ callback }: { callback: () => void }) {
  return (
    <main>
      <Sidebar callback={callback} />
      <Calendar />
    </main>
  );
}
export default MainScreen;
